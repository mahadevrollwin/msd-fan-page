/**
 * Hand-written Sanity document shapes for Phase 3.
 * Phase 4 can replace these with generated types from `npm run sanity:typegen`.
 */

export type SanitySlug = {
  current?: string;
};

export type SanityImage = {
  asset?: {
    _ref?: string;
    _type?: string;
  };
  alt?: string;
  caption?: string;
};

export type SanityCategory = {
  _id: string;
  _type: "category";
  title?: string;
  slug?: SanitySlug;
  description?: string;
};

export type SanityBlog = {
  _id: string;
  _type: "blog";
  title?: string;
  slug?: SanitySlug;
  excerpt?: string;
  featuredImage?: SanityImage;
  content?: unknown[];
  category?: SanityCategory | { _ref: string };
  author?: string;
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type SanityGalleryImage = {
  _id: string;
  _type: "galleryImage";
  title?: string;
  image?: SanityImage;
  description?: string;
  category?: string;
  altText?: string;
  publishedAt?: string;
};

export type SanityGalleryVideo = {
  _id: string;
  _type: "galleryVideo";
  title?: string;
  thumbnail?: SanityImage;
  videoFile?: { asset?: { _ref?: string; url?: string } };
  videoUrl?: string;
  description?: string;
  category?: string;
  publishedAt?: string;
};

export type SanitySiteSettings = {
  _id: "siteSettings";
  _type: "siteSettings";
  siteName?: string;
  tagline?: string;
  logo?: SanityImage;
  jerseyNumber?: string;
  disclaimer?: string;
  navigation?: Array<{ label?: string; href?: string; note?: string }>;
  footerText?: string;
  socialLinks?: Array<{ label?: string; href?: string; hint?: string }>;
};

export type SanityHomePage = {
  _id: "homePage";
  _type: "homePage";
  hero?: {
    kicker?: string;
    brand?: string;
    heading?: string;
    description?: string;
    image?: SanityImage;
    primaryCta?: { label?: string; href?: string };
    secondaryCta?: { label?: string; href?: string };
  };
  featuredMoments?: Array<{
    title?: string;
    year?: string;
    summary?: string;
    image?: SanityImage;
  }>;
  careerHighlights?: Array<{
    year?: string;
    title?: string;
    summary?: string;
  }>;
  featuredBlogs?: Array<SanityBlog | { _ref: string }>;
  featuredGalleryImages?: Array<SanityGalleryImage | { _ref: string }>;
  featuredVideos?: Array<SanityGalleryVideo | { _ref: string }>;
  aboutPreview?: {
    kicker?: string;
    title?: string;
    summary?: string;
    image?: SanityImage;
    cta?: { label?: string; href?: string };
  };
};

export type SanityAboutPage = {
  _id: "aboutPage";
  _type: "aboutPage";
  hero?: {
    kicker?: string;
    title?: string;
    summary?: string;
  };
  fanPage?: {
    title?: string;
    body?: unknown[];
    image?: SanityImage;
  };
  journey?: {
    title?: string;
    summary?: string;
    image?: SanityImage;
    beats?: Array<{ title?: string; text?: string }>;
  };
  milestones?: Array<{
    year?: string;
    title?: string;
    summary?: string;
  }>;
  legacy?: {
    title?: string;
    summary?: string;
    points?: string[];
    image?: SanityImage;
  };
};

export type SanityLegalPage = {
  _id: string;
  _type: "legalPage";
  title?: string;
  pageKey?: "terms-and-conditions" | "privacy-policy";
  summary?: string;
  updatedAt?: string;
  content?: unknown[];
};
