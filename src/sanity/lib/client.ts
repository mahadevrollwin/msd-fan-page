import { createClient } from "next-sanity";
import { apiVersion, assertSanityEnv, dataset, projectId } from "@/sanity/env";

assertSanityEnv();

/**
 * Read-only browser-safe client. No write tokens here.
 * Phase 4 will use this for GROQ fetches.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
