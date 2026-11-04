import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  _type?: string;
  slug?: string | null;
  pageKey?: string | null;
};

const TYPE_PATHS: Record<string, string[]> = {
  homePage: ["/"],
  siteSettings: ["/", "/blogs", "/gallery", "/gallery/videos", "/about"],
  aboutPage: ["/about"],
  galleryImage: ["/gallery", "/"],
  galleryVideo: ["/gallery/videos", "/gallery", "/"],
  category: ["/blogs"],
  blog: ["/blogs", "/"],
  legalPage: ["/terms-and-conditions", "/privacy-policy"],
};

function pathsForPayload(body: WebhookPayload): string[] {
  const paths = new Set<string>(TYPE_PATHS[body._type ?? ""] ?? []);

  if (body._type === "blog" && body.slug) {
    paths.add(`/blogs/${body.slug}`);
  }

  if (body._type === "legalPage" && body.pageKey) {
    paths.add(`/${body.pageKey}`);
  }

  return [...paths];
}

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) {
      return NextResponse.json(
        { message: "Missing SANITY_REVALIDATE_SECRET" },
        { status: 500 },
      );
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      secret,
      true,
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { message: "Invalid signature", isValidSignature, body },
        { status: 401 },
      );
    }

    if (!body?._type) {
      return NextResponse.json(
        { message: "Bad Request: missing _type", body },
        { status: 400 },
      );
    }

    revalidateTag(body._type, "max");
    revalidateTag("sanity", "max");

    const paths = pathsForPayload(body);
    for (const path of paths) {
      revalidatePath(path);
    }
    // Bust the site shell so nav/settings updates land everywhere.
    revalidatePath("/", "layout");

    return NextResponse.json({
      revalidated: true,
      type: body._type,
      tags: [body._type, "sanity"],
      paths,
      now: Date.now(),
    });
  } catch (err: unknown) {
    console.error("[revalidate]", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

/**
 * Manual bust for deploy recovery / Studio "refresh live site" checks.
 * GET /api/revalidate?secret=...&tag=homePage
 */
export async function GET(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const url = req.nextUrl;
  const provided = url.searchParams.get("secret");
  const tag = url.searchParams.get("tag") ?? "sanity";

  if (!secret) {
    return NextResponse.json(
      { message: "Missing SANITY_REVALIDATE_SECRET" },
      { status: 500 },
    );
  }

  if (!provided || provided !== secret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  revalidateTag(tag, "max");
  revalidateTag("sanity", "max");
  revalidatePath("/", "layout");

  const paths = TYPE_PATHS[tag] ?? ["/"];
  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({
    revalidated: true,
    tag,
    paths,
    now: Date.now(),
  });
}
