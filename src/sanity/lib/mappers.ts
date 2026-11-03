import type {
  BlogPost,
  Category,
  FeaturedMoment,
  GalleryImage,
  GalleryVideo,
} from "@/data/types";
import { resolveImage } from "@/sanity/lib/image";

type SanityCategoryDoc = {
  _id?: string;
  title?: string | null;
  slug?: string | null;
  description?: string | null;
  count?: number | null;
} | null;

type SanityImageDoc = {
  asset?: { url?: string | null } | null;
  alt?: string | null;
  caption?: string | null;
} | null;

type SanityBlogDoc = {
  _id: string;
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  author?: string | null;
  publishedAt?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  category?: SanityCategoryDoc;
  featuredImage?: SanityImageDoc;
  content?: unknown[] | null;
};

type SanityGalleryImageDoc = {
  _id: string;
  title?: string | null;
  description?: string | null;
  category?: string | null;
  altText?: string | null;
  publishedAt?: string | null;
  image?: SanityImageDoc;
};

type SanityGalleryVideoDoc = {
  _id: string;
  title?: string | null;
  description?: string | null;
  category?: string | null;
  publishedAt?: string | null;
  videoUrl?: string | null;
  thumbnail?: SanityImageDoc;
  videoFile?: { asset?: { url?: string | null } | null } | null;
};

const FALLBACK_CATEGORY: Category = {
  id: "uncategorized",
  title: "Archive",
  slug: "archive",
};

export function mapCategory(doc: SanityCategoryDoc): Category | null {
  if (!doc?._id || !doc.title || !doc.slug) return null;
  return {
    id: doc._id,
    title: doc.title,
    slug: doc.slug,
    count: typeof doc.count === "number" ? doc.count : undefined,
  };
}

export function mapBlogCard(doc: SanityBlogDoc | null | undefined): BlogPost | null {
  if (!doc?._id || !doc.title || !doc.slug || !doc.publishedAt) return null;

  const image =
    resolveImage(doc.featuredImage ?? null, doc.title, 1200) ?? {
      src: "/icon.svg",
      alt: doc.title,
    };

  return {
    id: doc._id,
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt ?? "",
    category: mapCategory(doc.category ?? null) ?? FALLBACK_CATEGORY,
    author: doc.author ?? "Archive Desk",
    publishedAt: doc.publishedAt,
    featuredImage: image,
    content: [],
    portableText: doc.content ?? undefined,
    seoTitle: doc.seoTitle || doc.title,
    seoDescription: doc.seoDescription || doc.excerpt || doc.title,
  };
}

export function mapGalleryImage(
  doc: SanityGalleryImageDoc | null | undefined,
): GalleryImage | null {
  if (!doc?._id || !doc.title || !doc.publishedAt) return null;
  const image = resolveImage(
    doc.image ?? null,
    doc.altText || doc.title,
    1400,
  );
  if (!image) return null;

  return {
    id: doc._id,
    title: doc.title,
    description: doc.description ?? "",
    category: doc.category ?? "Archive",
    altText: doc.altText || image.alt,
    publishedAt: doc.publishedAt,
    image: {
      src: image.src,
      alt: doc.altText || image.alt,
    },
  };
}

export function mapGalleryVideo(
  doc: SanityGalleryVideoDoc | null | undefined,
): GalleryVideo | null {
  if (!doc?._id || !doc.title || !doc.publishedAt) return null;
  const thumbnail =
    resolveImage(doc.thumbnail ?? null, doc.title, 1200) ?? {
      src: "/icon.svg",
      alt: doc.title,
    };

  return {
    id: doc._id,
    title: doc.title,
    description: doc.description ?? "",
    category: doc.category ?? "Archive",
    publishedAt: doc.publishedAt,
    thumbnail,
    videoFile: doc.videoFile?.asset?.url || undefined,
    videoUrl: doc.videoUrl || undefined,
  };
}

export function mapFeaturedMoment(
  item: {
    title?: string | null;
    year?: string | null;
    summary?: string | null;
    image?: SanityImageDoc;
  },
  index: number,
): FeaturedMoment | null {
  if (!item.title) return null;
  const image =
    resolveImage(item.image ?? null, item.title, 1400) ?? {
      src: "/icon.svg",
      alt: item.title,
    };

  return {
    id: `moment-${index}-${item.title}`,
    title: item.title,
    year: item.year ?? "",
    summary: item.summary ?? "",
    image,
  };
}
