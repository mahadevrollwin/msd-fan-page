import { defineLive } from "next-sanity/live";
import { client } from "@/sanity/lib/client";

/**
 * Published-content Live setup (no draft / Presentation tokens).
 * `sanityFetch` tags the Next.js Data Cache; `<SanityLive />` listens to the
 * Live Content API and revalidates those tags when Sanity publishes changes.
 */
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: false,
  browserToken: false,
});
