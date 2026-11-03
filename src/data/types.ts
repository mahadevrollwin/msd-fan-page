export type Category = {
  id: string;
  title: string;
  slug: string;
  /** Published essay count when available from Sanity or local placeholders. */
  count?: number;
};

export type BlogBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
    };

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: Category;
  author: string;
  publishedAt: string;
  featuredImage: {
    src: string;
    alt: string;
    blurDataURL?: string;
  };
  content: BlogBlock[];
  /** Present when the essay body comes from Sanity Portable Text. */
  portableText?: unknown[];
  seoTitle: string;
  seoDescription: string;
};

export type GalleryImage = {
  id: string;
  title: string;
  description: string;
  category: string;
  altText: string;
  publishedAt: string;
  image: {
    src: string;
    alt: string;
    blurDataURL?: string;
  };
};

export type GalleryVideo = {
  id: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  thumbnail: {
    src: string;
    alt: string;
    blurDataURL?: string;
  };
  videoFile?: string;
  videoUrl?: string;
};

export type CareerHighlight = {
  year: string;
  title: string;
  summary: string;
};

export type FeaturedMoment = {
  id: string;
  title: string;
  year: string;
  summary: string;
  image: {
    src: string;
    alt: string;
    blurDataURL?: string;
  };
};
