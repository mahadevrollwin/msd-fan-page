import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { assertSanityEnv, dataset, projectId } from "@/sanity/env";

assertSanityEnv();

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}
