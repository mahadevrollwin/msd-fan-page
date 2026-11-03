import fs from "node:fs";

const text = fs.readFileSync(".env.local", "utf8");
for (const key of [
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_DATASET",
  "SANITY_STUDIO_PROJECT_ID",
  "SANITY_STUDIO_DATASET",
]) {
  const match = text.match(new RegExp(`^${key}=(.*)$`, "m"));
  if (!match) {
    console.log(`${key} missing`);
    continue;
  }
  const raw = match[1];
  const cleaned = raw.trim().replace(/^["']|["']$/g, "");
  const startCodes = [...raw].slice(0, 4).map((c) => c.charCodeAt(0)).join(",");
  console.log(
    `${key} rawLen=${raw.length} cleanLen=${cleaned.length} startCodes=${startCodes} alnum=${/^[a-z0-9._-]+$/i.test(cleaned)}`,
  );
}
