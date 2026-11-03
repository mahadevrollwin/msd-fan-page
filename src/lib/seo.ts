import type { Metadata } from "next";
import { site } from "@/lib/site";

export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return raw.replace(/\/$/, "");
}

export function absoluteUrl(path = "/") {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: { src: string; alt?: string } | null;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
  /** Skip the root title template (use for the homepage). */
  absoluteTitle?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
  absoluteTitle = false,
}: BuildPageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image?.src
    ? [
        {
          url: image.src.startsWith("http")
            ? image.src
            : absoluteUrl(image.src),
          alt: image.alt || title,
        },
      ]
    : undefined;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "en_IN",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(ogImage ? { images: ogImage } : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      ...(ogImage ? { images: [ogImage[0].url] } : {}),
    },
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  imageSrc: string;
  author: string;
  publishedAt: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: [
      input.imageSrc.startsWith("http")
        ? input.imageSrc
        : absoluteUrl(input.imageSrc),
    ],
    datePublished: input.publishedAt,
    dateModified: input.publishedAt,
    author: {
      "@type": "Person",
      name: input.author,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: getSiteUrl(),
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(input.path),
    },
    ...(input.category
      ? {
          articleSection: input.category,
        }
      : {}),
    isAccessibleForFree: true,
    about: {
      "@type": "Person",
      name: "MS Dhoni",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: getSiteUrl(),
    description: site.description,
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: getSiteUrl(),
    },
  };
}
