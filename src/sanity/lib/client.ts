import { createClient } from "next-sanity";
import { apiVersion, assertSanityEnv, dataset, projectId } from "@/sanity/env";

assertSanityEnv();

/**
 * Read-only browser-safe client. No write tokens here.
 * Server fetches go through `src/sanity/lib/fetch.ts` with `use cache`.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
