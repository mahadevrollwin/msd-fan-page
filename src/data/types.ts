export type Category = {
  id: string;
  title: string;
  slug: string;
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
  };
  content: BlogBlock[];
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
  };
};
