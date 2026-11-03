import { createClient } from "next-sanity";

const base = process.env.SMOKE_BASE_URL || "http://127.0.0.1:3000";

const routes = [
  "/",
  "/blogs",
  "/blogs?category=moments",
  "/blogs?page=2",
  "/blogs/the-quiet-that-followed-the-last-ball",
  "/gallery",
  "/gallery?tab=videos",
  "/about",
  "/terms-and-conditions",
  "/privacy-policy",
  "/robots.txt",
  "/sitemap.xml",
  "/studio",
  "/this-route-should-404",
];

async function checkRoute(path) {
  const url = `${base}${path}`;
  const started = Date.now();
  try {
    const res = await fetch(url, {
      redirect: "manual",
      headers: { Accept: "text/html,application/xml,text/plain,*/*" },
    });
    const text = await res.text();
    const ms = Date.now() - started;
    const expect404 = path.includes("should-404");
    const ok = expect404 ? res.status === 404 : res.status >= 200 && res.status < 400;
    return {
      path,
      status: res.status,
      ms,
      ok,
      bytes: text.length,
      hasMain: text.includes('id="main"') || path.endsWith(".xml") || path.endsWith(".txt") || path.startsWith("/studio"),
    };
  } catch (error) {
    return {
      path,
      status: 0,
      ms: Date.now() - started,
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function checkSanity() {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "sacle4cb",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01",
    useCdn: true,
  });

  const types = [
    "blog",
    "category",
    "homePage",
    "aboutPage",
    "legalPage",
    "galleryImage",
    "galleryVideo",
    "siteSettings",
  ];
  const counts = {};
  for (const type of types) {
    counts[type] = await client.fetch("count(*[_type == $type])", { type });
  }
  return counts;
}

const routeResults = [];
for (const path of routes) {
  routeResults.push(await checkRoute(path));
}

const sanity = await checkSanity();
const failed = routeResults.filter((r) => !r.ok);

console.log(
  JSON.stringify(
    {
      base,
      routes: routeResults,
      failedCount: failed.length,
      sanity,
      cmsEmpty: Object.values(sanity).every((n) => n === 0),
    },
    null,
    2,
  ),
);

if (failed.length > 0) process.exit(1);
