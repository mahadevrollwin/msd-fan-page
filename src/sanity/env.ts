function readEnv(name: string, fallback?: string) {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(
      `Missing environment variable: ${name}. Add it to .env.local and your Vercel project.`,
    );
  }
  return value;
}

export const projectId = readEnv(
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  process.env.SANITY_STUDIO_PROJECT_ID,
);

export const dataset = readEnv(
  "NEXT_PUBLIC_SANITY_DATASET",
  process.env.SANITY_STUDIO_DATASET,
);

export const apiVersion = readEnv(
  "NEXT_PUBLIC_SANITY_API_VERSION",
  "2025-01-01",
);
