/**
 * NEXT_PUBLIC_ values must be read with static property access so Next.js
 * can inline them into Client Components (dynamic process.env[name] will not).
 */

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  "";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  "";

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export function assertSanityEnv() {
  if (!projectId) {
    throw new Error(
      "Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Add it to .env.local and your Vercel project.",
    );
  }
  if (!dataset) {
    throw new Error(
      "Missing NEXT_PUBLIC_SANITY_DATASET. Add it to .env.local and your Vercel project.",
    );
  }
}
