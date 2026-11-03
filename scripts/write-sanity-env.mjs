import fs from "node:fs";

const projectId = "sacle4cb";
const dataset = "production";
const apiVersion = "2025-01-01";

const path = ".env.local";
const existing = fs.existsSync(path) ? fs.readFileSync(path, "utf8") : "";
const lines = existing.split(/\r?\n/).filter(Boolean);
const map = new Map();

for (const line of lines) {
  const idx = line.indexOf("=");
  if (idx === -1) continue;
  map.set(line.slice(0, idx), line);
}

const upsert = (key, value) => {
  map.set(key, `${key}=${value}`);
};

upsert("NEXT_PUBLIC_SITE_URL", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
upsert("NEXT_PUBLIC_SANITY_PROJECT_ID", projectId);
upsert("NEXT_PUBLIC_SANITY_DATASET", dataset);
upsert("NEXT_PUBLIC_SANITY_API_VERSION", apiVersion);
upsert("SANITY_STUDIO_PROJECT_ID", projectId);
upsert("SANITY_STUDIO_DATASET", dataset);

// Drop masked sensitive placeholders from earlier Vercel pull noise where possible.
for (const [key, line] of [...map.entries()]) {
  if (line.includes("[SENSITIVE]") || line.includes('"[SENSITIVE]"')) {
    map.delete(key);
  }
}

fs.writeFileSync(path, `${[...map.values()].join("\n")}\n`, "utf8");
console.log("Wrote Sanity env for project", projectId);
