import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { assertSanityEnv, dataset, projectId } from "@/sanity/env";

assertSanityEnv();

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

type ImageLike = {
  asset?: {
    url?: string | null;
    metadata?: { lqip?: string | null } | null;
  } | null;
  alt?: string | null;
  caption?: string | null;
} | null;

export type ResolvedImage = {
  src: string;
  alt: string;
  blurDataURL?: string;
};

export function resolveImage(
  source: ImageLike,
  fallbackAlt = "",
  width = 1600,
): ResolvedImage | null {
  if (!source?.asset) return null;

  const blurDataURL = source.asset.metadata?.lqip || undefined;

  try {
    const src = urlForImage(source as SanityImageSource)
      .width(width)
      .auto("format")
      .url();
    if (!src) return null;
    return {
      src,
      alt: source.alt?.trim() || fallbackAlt,
      blurDataURL,
    };
  } catch {
    if (source.asset.url) {
      return {
        src: source.asset.url,
        alt: source.alt?.trim() || fallbackAlt,
        blurDataURL,
      };
    }
    return null;
  }
}
