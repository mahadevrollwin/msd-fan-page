import { createClient } from "next-sanity";
import { apiVersion, assertSanityEnv, dataset, projectId } from "@/sanity/env";

assertSanityEnv();

/**
 * Read-only browser-safe client. No write tokens here.
 * Public pages fetch through `src/sanity/lib/fetch.ts` at request time
 * (uncached) so CMS publishes show up on the next load.
 *
 * `useCdn: false` avoids briefly-stale API CDN responses after a publish.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
});
