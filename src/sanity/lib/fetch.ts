import { cacheLife, cacheTag } from "next/cache";
import { aboutContent } from "@/data/about";
import {
  BLOGS_PER_PAGE,
  blogs as placeholderBlogs,
  getBlogBySlug as getPlaceholderBlogBySlug,
  getRelatedBlogs as getPlaceholderRelatedBlogs,
  listBlogs as listPlaceholderBlogs,
} from "@/data/blogs";
import { categories as placeholderCategories } from "@/data/categories";
import {
  galleryImages as placeholderGalleryImages,
  galleryVideos as placeholderGalleryVideos,
} from "@/data/gallery";
import { homeContent as placeholderHome } from "@/data/home";
import {
  privacyContent as placeholderPrivacy,
  termsContent as placeholderTerms,
  type LegalPageContent,
} from "@/data/legal";
import type {
  BlogPost,
  CareerHighlight,
  Category,
  FeaturedMoment,
  GalleryImage,
  GalleryVideo,
} from "@/data/types";
import {
  legalNav,
  primaryNav,
  site,
  socialLinks,
  type NavItem,
  type SocialLink,
} from "@/lib/site";
import { client } from "@/sanity/lib/client";
import {
  mapBlogCard,
  mapCategory,
  mapFeaturedMoment,
  mapGalleryImage,
  mapGalleryVideo,
} from "@/sanity/lib/mappers";
import {
  ABOUT_PAGE_QUERY,
  BLOG_BY_SLUG_QUERY,
  BLOG_SITEMAP_QUERY,
  BLOG_SLUGS_QUERY,
  BLOGS_COUNT_QUERY,
  BLOGS_QUERY,
  CATEGORIES_QUERY,
  GALLERY_IMAGES_QUERY,
  GALLERY_VIDEOS_QUERY,
  HOME_PAGE_QUERY,
  LEGAL_PAGE_QUERY,
  RELATED_BLOGS_QUERY,
  SITE_SETTINGS_QUERY,
} from "@/sanity/lib/queries";
import { resolveImage } from "@/sanity/lib/image";

export type SiteSettingsView = {
  name: string;
  tagline: string;
  jersey: string;
  disclaimer: string;
  footerText: string;
  navigation: NavItem[];
  socialLinks: SocialLink[];
  source: "sanity" | "placeholder";
};

export type HomeContentView = {
  source: "sanity" | "placeholder";
  hero: {
    kicker: string;
    brand: string;
    heading: string;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    image: { src: string; alt: string; blurDataURL?: string };
  };
  moments: FeaturedMoment[];
  highlights: CareerHighlight[];
  aboutPreview: {
    kicker: string;
    title: string;
    summary: string;
    image: { src: string; alt: string; blurDataURL?: string };
    cta: { label: string; href: string };
  };
  featuredBlogs: BlogPost[];
  featuredImages: GalleryImage[];
  featuredVideos: GalleryVideo[];
};

export type AboutContentView = {
  source: "sanity" | "placeholder";
  hero: {
    kicker: string;
    title: string;
    summary: string;
  };
  fanPage: {
    title: string;
    paragraphs: string[];
    portableText?: unknown[];
    image: { src: string; alt: string };
  };
  journey: {
    title: string;
    summary: string;
    image: { src: string; alt: string };
    beats: Array<{ title: string; text: string }>;
  };
  milestones: Array<{ year: string; title: string; summary: string }>;
  legacy: {
    title: string;
    summary: string;
    points: string[];
    image: { src: string; alt: string };
  };
};

export type LegalContentView = LegalPageContent & {
  source: "sanity" | "placeholder";
  portableText?: unknown[];
};

function asHref(href: string | null | undefined): NavItem["href"] | null {
  const value = href?.trim();
  if (!value) return null;
  const allowed = new Set([
    "/",
    "/blogs",
    "/gallery",
    "/about",
    "/terms-and-conditions",
    "/privacy-policy",
  ]);
  if (!allowed.has(value)) return null;
  return value as NavItem["href"];
}

function extractPlainParagraphs(blocks: unknown[] | null | undefined) {
  if (!blocks?.length) return [] as string[];
  return blocks
    .map((block) => {
      if (!block || typeof block !== "object") return null;
      const value = block as {
        _type?: string;
        style?: string;
        children?: Array<{ text?: string }>;
      };
      if (value._type !== "block" || value.style !== "normal") return null;
      const text = (value.children ?? [])
        .map((child) => child.text ?? "")
        .join("")
        .trim();
      return text || null;
    })
    .filter((text): text is string => Boolean(text));
}

async function sanityFetch<T>(
  query: Parameters<typeof client.fetch>[0],
  params: Record<string, unknown> = {},
  tags: string[] = [],
): Promise<T> {
  "use cache";
  cacheLife("hours");
  for (const tag of tags) cacheTag(tag);
  cacheTag("sanity");
  return client.fetch<T>(query, params);
}

export async function getSiteSettings(): Promise<SiteSettingsView> {
  const doc = await sanityFetch<Record<string, unknown> | null>(
    SITE_SETTINGS_QUERY,
    {},
    ["siteSettings"],
  );

  if (!doc) {
    return {
      name: site.name,
      tagline: site.tagline,
      jersey: site.jersey,
      disclaimer: site.disclaimer,
      footerText: site.description,
      navigation: primaryNav,
      socialLinks,
      source: "placeholder",
    };
  }

  const navigation = Array.isArray(doc.navigation)
    ? (doc.navigation as Array<{ label?: string; href?: string; note?: string }>)
        .map((item) => {
          const href = asHref(item.href);
          if (!href || !item.label) return null;
          return {
            label: item.label,
            href,
            note: item.note ?? "",
          } satisfies NavItem;
        })
        .filter((item): item is NavItem => item !== null)
    : [];

  const links = Array.isArray(doc.socialLinks)
    ? (doc.socialLinks as Array<{ label?: string; href?: string; hint?: string }>)
        .map((item) => {
          if (!item.label || !item.href) return null;
          return {
            label: item.label,
            href: item.href,
            hint: item.hint ?? item.label,
          } satisfies SocialLink;
        })
        .filter((item): item is SocialLink => item !== null)
    : [];

  return {
    name: typeof doc.siteName === "string" && doc.siteName ? doc.siteName : site.name,
    tagline: typeof doc.tagline === "string" && doc.tagline ? doc.tagline : site.tagline,
    jersey:
      typeof doc.jerseyNumber === "string" && doc.jerseyNumber
        ? doc.jerseyNumber
        : site.jersey,
    disclaimer:
      typeof doc.disclaimer === "string" && doc.disclaimer
        ? doc.disclaimer
        : site.disclaimer,
    footerText:
      typeof doc.footerText === "string" && doc.footerText
        ? doc.footerText
        : site.description,
    navigation: navigation.length > 0 ? navigation : primaryNav,
    socialLinks: links.length > 0 ? links : socialLinks,
    source: "sanity",
  };
}

export async function getHomeContent(): Promise<HomeContentView> {
  const doc = await sanityFetch<Record<string, unknown> | null>(
    HOME_PAGE_QUERY,
    {},
    ["homePage", "blog", "galleryImage", "galleryVideo"],
  );

  if (!doc?.hero || typeof doc.hero !== "object") {
    return {
      source: "placeholder",
      hero: {
        ...placeholderHome.hero,
        image: { ...placeholderHome.hero.image },
        primaryCta: { ...placeholderHome.hero.primaryCta },
        secondaryCta: { ...placeholderHome.hero.secondaryCta },
      },
      moments: placeholderHome.moments.map((moment) => ({
        ...moment,
        image: { ...moment.image },
      })),
      highlights: [...placeholderHome.highlights],
      aboutPreview: {
        ...placeholderHome.aboutPreview,
        image: { ...placeholderHome.aboutPreview.image },
        cta: { ...placeholderHome.aboutPreview.cta },
      },
      featuredBlogs: placeholderHome.featuredBlogs,
      featuredImages: placeholderHome.featuredImages,
      featuredVideos: placeholderHome.featuredVideos,
    };
  }

  const hero = doc.hero as {
    kicker?: string;
    brand?: string;
    heading?: string;
    description?: string;
    primaryCta?: { label?: string; href?: string };
    secondaryCta?: { label?: string; href?: string };
    image?: Parameters<typeof resolveImage>[0];
  };

  const heroImage =
    resolveImage(hero.image ?? null, hero.heading || "MSD Archive hero", 2000) ??
    placeholderHome.hero.image;

  const moments = Array.isArray(doc.featuredMoments)
    ? doc.featuredMoments
        .map((item, index) =>
          mapFeaturedMoment(
            item as {
              title?: string;
              year?: string;
              summary?: string;
              image?: Parameters<typeof resolveImage>[0];
            },
            index,
          ),
        )
        .filter((item): item is NonNullable<typeof item> => item !== null)
    : [];

  const highlights = Array.isArray(doc.careerHighlights)
    ? (doc.careerHighlights as Array<{
        year?: string;
        title?: string;
        summary?: string;
      }>)
        .filter((item) => item.title)
        .map((item) => ({
          year: item.year ?? "",
          title: item.title as string,
          summary: item.summary ?? "",
        }))
    : [];

  const featuredBlogs = Array.isArray(doc.featuredBlogs)
    ? doc.featuredBlogs
        .map((item) => mapBlogCard(item as Parameters<typeof mapBlogCard>[0]))
        .filter((item): item is BlogPost => item !== null)
    : [];

  const featuredImages = Array.isArray(doc.featuredGalleryImages)
    ? doc.featuredGalleryImages
        .map((item) => mapGalleryImage(item as Parameters<typeof mapGalleryImage>[0]))
        .filter((item): item is GalleryImage => item !== null)
    : [];

  const featuredVideos = Array.isArray(doc.featuredVideos)
    ? doc.featuredVideos
        .map((item) => mapGalleryVideo(item as Parameters<typeof mapGalleryVideo>[0]))
        .filter((item): item is GalleryVideo => item !== null)
    : [];

  const aboutPreview = (doc.aboutPreview ?? {}) as {
    kicker?: string;
    title?: string;
    summary?: string;
    cta?: { label?: string; href?: string };
    image?: Parameters<typeof resolveImage>[0];
  };

  return {
    source: "sanity",
    hero: {
      kicker: hero.kicker || placeholderHome.hero.kicker,
      brand: hero.brand || placeholderHome.hero.brand,
      heading: hero.heading || placeholderHome.hero.heading,
      description: hero.description || placeholderHome.hero.description,
      primaryCta: {
        label: hero.primaryCta?.label || placeholderHome.hero.primaryCta.label,
        href:
          asHref(hero.primaryCta?.href) || placeholderHome.hero.primaryCta.href,
      },
      secondaryCta: {
        label:
          hero.secondaryCta?.label || placeholderHome.hero.secondaryCta.label,
        href:
          asHref(hero.secondaryCta?.href) ||
          placeholderHome.hero.secondaryCta.href,
      },
      image: heroImage,
    },
    moments:
      moments.length > 0
        ? moments
        : placeholderHome.moments.map((moment) => ({
            ...moment,
            image: { ...moment.image },
          })),
    highlights:
      highlights.length > 0 ? highlights : [...placeholderHome.highlights],
    aboutPreview: {
      kicker: aboutPreview.kicker || placeholderHome.aboutPreview.kicker,
      title: aboutPreview.title || placeholderHome.aboutPreview.title,
      summary: aboutPreview.summary || placeholderHome.aboutPreview.summary,
      image:
        resolveImage(
          aboutPreview.image ?? null,
          aboutPreview.title || "About preview",
          1400,
        ) ?? { ...placeholderHome.aboutPreview.image },
      cta: {
        label: aboutPreview.cta?.label || placeholderHome.aboutPreview.cta.label,
        href:
          asHref(aboutPreview.cta?.href) ||
          placeholderHome.aboutPreview.cta.href,
      },
    },
    featuredBlogs:
      featuredBlogs.length > 0 ? featuredBlogs : placeholderHome.featuredBlogs,
    featuredImages:
      featuredImages.length > 0
        ? featuredImages
        : placeholderHome.featuredImages,
    featuredVideos:
      featuredVideos.length > 0
        ? featuredVideos
        : placeholderHome.featuredVideos,
  };
}

export async function getAboutContent(): Promise<AboutContentView> {
  const doc = await sanityFetch<Record<string, unknown> | null>(
    ABOUT_PAGE_QUERY,
    {},
    ["aboutPage"],
  );

  if (!doc?.hero || typeof doc.hero !== "object") {
    return { ...aboutContent, source: "placeholder" };
  }

  const hero = doc.hero as {
    kicker?: string;
    title?: string;
    summary?: string;
  };
  const fanPage = (doc.fanPage ?? {}) as {
    title?: string;
    body?: unknown[];
    image?: Parameters<typeof resolveImage>[0];
  };
  const journey = (doc.journey ?? {}) as {
    title?: string;
    summary?: string;
    beats?: Array<{ title?: string; text?: string }>;
    image?: Parameters<typeof resolveImage>[0];
  };
  const legacy = (doc.legacy ?? {}) as {
    title?: string;
    summary?: string;
    points?: string[];
    image?: Parameters<typeof resolveImage>[0];
  };

  const paragraphs = extractPlainParagraphs(fanPage.body);

  return {
    source: "sanity",
    hero: {
      kicker: hero.kicker || aboutContent.hero.kicker,
      title: hero.title || aboutContent.hero.title,
      summary: hero.summary || aboutContent.hero.summary,
    },
    fanPage: {
      title: fanPage.title || aboutContent.fanPage.title,
      paragraphs:
        paragraphs.length > 0 ? paragraphs : aboutContent.fanPage.paragraphs,
      portableText: fanPage.body,
      image:
        resolveImage(fanPage.image ?? null, fanPage.title || "About", 1400) ??
        aboutContent.fanPage.image,
    },
    journey: {
      title: journey.title || aboutContent.journey.title,
      summary: journey.summary || aboutContent.journey.summary,
      image:
        resolveImage(journey.image ?? null, journey.title || "Journey", 1400) ??
        aboutContent.journey.image,
      beats: Array.isArray(journey.beats)
        ? journey.beats
            .filter((beat) => beat.title && beat.text)
            .map((beat) => ({
              title: beat.title as string,
              text: beat.text as string,
            }))
        : aboutContent.journey.beats,
    },
    milestones: Array.isArray(doc.milestones)
      ? (doc.milestones as Array<{
          year?: string;
          title?: string;
          summary?: string;
        }>)
          .filter((item) => item.title)
          .map((item) => ({
            year: item.year ?? "",
            title: item.title as string,
            summary: item.summary ?? "",
          }))
      : aboutContent.milestones,
    legacy: {
      title: legacy.title || aboutContent.legacy.title,
      summary: legacy.summary || aboutContent.legacy.summary,
      points:
        Array.isArray(legacy.points) && legacy.points.length > 0
          ? legacy.points.filter((point): point is string => Boolean(point))
          : aboutContent.legacy.points,
      image:
        resolveImage(legacy.image ?? null, legacy.title || "Legacy", 1400) ??
        aboutContent.legacy.image,
    },
  };
}

export async function getLegalContent(
  pageKey: "terms-and-conditions" | "privacy-policy",
): Promise<LegalContentView> {
  const fallback =
    pageKey === "terms-and-conditions" ? placeholderTerms : placeholderPrivacy;

  const doc = await sanityFetch<{
    title?: string;
    summary?: string;
    updatedAt?: string;
    content?: unknown[];
  } | null>(LEGAL_PAGE_QUERY, { pageKey }, ["legalPage", pageKey]);

  if (!doc?.title || !doc.content?.length) {
    return { ...fallback, source: "placeholder" };
  }

  return {
    source: "sanity",
    slug: pageKey,
    title: doc.title,
    summary: doc.summary || fallback.summary,
    updatedAt: doc.updatedAt || fallback.updatedAt,
    blocks: fallback.blocks,
    portableText: doc.content,
  };
}

export async function getCategories(): Promise<Category[]> {
  const docs = await sanityFetch<
    Array<{ _id?: string; title?: string; slug?: string; count?: number }>
  >(CATEGORIES_QUERY, {}, ["category", "blog"]);

  const mapped = docs
    .map((doc) => mapCategory(doc))
    .filter((item): item is Category => item !== null);

  if (mapped.length > 0) return mapped;

  return placeholderCategories.map((category) => ({
    ...category,
    count: placeholderBlogs.filter((post) => post.category.slug === category.slug)
      .length,
  }));
}

export async function listBlogs(options?: {
  category?: string;
  page?: number;
}) {
  const category = options?.category;
  const page = Math.max(1, options?.page ?? 1);
  const total = await sanityFetch<number>(
    BLOGS_COUNT_QUERY,
    { category: category ?? null },
    ["blog"],
  );

  if (total === 0) {
    return {
      ...listPlaceholderBlogs(options),
      source: "placeholder" as const,
    };
  }

  const totalPages = Math.max(1, Math.ceil(total / BLOGS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * BLOGS_PER_PAGE;
  const end = start + BLOGS_PER_PAGE;

  const docs = await sanityFetch<Array<Parameters<typeof mapBlogCard>[0]>>(
    BLOGS_QUERY,
    { category: category ?? null, start, end },
    ["blog"],
  );

  return {
    posts: docs
      .map((doc) => mapBlogCard(doc))
      .filter((item): item is BlogPost => item !== null),
    total,
    totalPages,
    currentPage,
    category: category ?? null,
    source: "sanity" as const,
  };
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const doc = await sanityFetch<Parameters<typeof mapBlogCard>[0] | null>(
    BLOG_BY_SLUG_QUERY,
    { slug },
    ["blog", `blog:${slug}`],
  );

  const mapped = mapBlogCard(doc);
  if (mapped) return mapped;
  return getPlaceholderBlogBySlug(slug) ?? null;
}

export async function getRelatedBlogs(
  slug: string,
  categoryId?: string,
  limit = 3,
): Promise<BlogPost[]> {
  if (!categoryId) {
    return getPlaceholderRelatedBlogs(slug, limit);
  }

  const docs = await sanityFetch<Array<Parameters<typeof mapBlogCard>[0]>>(
    RELATED_BLOGS_QUERY,
    { slug, categoryId, limit },
    ["blog"],
  );

  const mapped = docs
    .map((doc) => mapBlogCard(doc))
    .filter((item): item is BlogPost => item !== null);

  if (mapped.length > 0) return mapped;
  return getPlaceholderRelatedBlogs(slug, limit);
}

export async function getBlogSlugs(): Promise<string[]> {
  const slugs = await sanityFetch<string[]>(BLOG_SLUGS_QUERY, {}, ["blog"]);
  if (slugs.length > 0) return slugs;
  return placeholderBlogs.map((post) => post.slug);
}

export async function getBlogSitemapEntries(): Promise<
  Array<{ slug: string; publishedAt: string }>
> {
  const docs = await sanityFetch<
    Array<{ slug?: string; publishedAt?: string }>
  >(BLOG_SITEMAP_QUERY, {}, ["blog"]);

  const mapped = docs
    .filter((doc): doc is { slug: string; publishedAt: string } =>
      Boolean(doc.slug && doc.publishedAt),
    )
    .map((doc) => ({ slug: doc.slug, publishedAt: doc.publishedAt }));

  if (mapped.length > 0) return mapped;

  return placeholderBlogs.map((post) => ({
    slug: post.slug,
    publishedAt: post.publishedAt,
  }));
}

export async function getGalleryContent(): Promise<{
  images: GalleryImage[];
  videos: GalleryVideo[];
  source: "sanity" | "placeholder";
}> {
  const [images, videos] = await Promise.all([
    sanityFetch<Array<Parameters<typeof mapGalleryImage>[0]>>(
      GALLERY_IMAGES_QUERY,
      {},
      ["galleryImage"],
    ),
    sanityFetch<Array<Parameters<typeof mapGalleryVideo>[0]>>(
      GALLERY_VIDEOS_QUERY,
      {},
      ["galleryVideo"],
    ),
  ]);

  const mappedImages = images
    .map((doc) => mapGalleryImage(doc))
    .filter((item): item is GalleryImage => item !== null);
  const mappedVideos = videos
    .map((doc) => mapGalleryVideo(doc))
    .filter((item): item is GalleryVideo => item !== null);

  if (mappedImages.length === 0 && mappedVideos.length === 0) {
    return {
      images: placeholderGalleryImages,
      videos: placeholderGalleryVideos,
      source: "placeholder",
    };
  }

  return {
    images: mappedImages,
    videos: mappedVideos,
    source: "sanity",
  };
}

export { legalNav };
