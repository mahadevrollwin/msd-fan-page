import { createClient } from "next-sanity";
import { apiVersion, assertSanityEnv, dataset, projectId } from "@/sanity/env";

assertSanityEnv();

/**
 * Read-only browser-safe client. No write tokens here.
 * Server fetches go through `src/sanity/lib/fetch.ts` with `use cache`.
 *
 * `useCdn: false` so on-demand revalidation (webhook / Live tag bust) reads
 * fresh Content Lake data instead of a briefly-stale API CDN response.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
});
