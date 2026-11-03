import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogListing } from "@/components/blog/BlogListing";
import { PageFrame } from "@/components/layout/PageFrame";
import { buildPageMetadata } from "@/lib/seo";
import { getCategories, listBlogs } from "@/sanity/lib/fetch";

type BlogsPageProps = {
  searchParams: Promise<{ category?: string; page?: string }>;
};

export async function generateMetadata({
  searchParams,
}: BlogsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const category = params.category;
  const page = Number(params.page ?? "1");
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const query = new URLSearchParams();
  if (category) query.set("category", category);
  if (safePage > 1) query.set("page", String(safePage));
  const suffix = query.toString() ? `?${query.toString()}` : "";

  const title = category
    ? `Blogs · ${category.replace(/-/g, " ")}`
    : safePage > 1
      ? `Blogs · Page ${safePage}`
      : "Blogs";

  return buildPageMetadata({
    title,
    description:
      "Essays and match notes from an unofficial MS Dhoni fan archive. Newest writing first.",
    path: `/blogs${suffix}`,
  });
}

async function BlogListingSection({ searchParams }: BlogsPageProps) {
  const params = await searchParams;
  const page = Number(params.page ?? "1");
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const [categories, listing] = await Promise.all([
    getCategories(),
    listBlogs({ category: params.category, page: safePage }),
  ]);

  return <BlogListing categories={categories} listing={listing} />;
}

export default function BlogsPage({ searchParams }: BlogsPageProps) {
  return (
    <PageFrame
      kicker="The writing"
      title="Blogs"
      summary="Match notes and longer reads, newest first. Filter by category and page through nine essays at a time."
    >
      <Suspense
        fallback={
          <div
            className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
            aria-busy="true"
            aria-label="Loading essays"
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="aspect-[16/10] bg-cream/10" />
            ))}
          </div>
        }
      >
        <BlogListingSection searchParams={searchParams} />
      </Suspense>
    </PageFrame>
  );
}
