import { categories } from "@/data/categories";
import { media } from "@/data/media";
import type { BlogPost } from "@/data/types";

const bySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));

export const blogs: BlogPost[] = [
  {
    id: "b01",
    title: "The quiet that followed the last ball",
    slug: "the-quiet-that-followed-the-last-ball",
    excerpt:
      "How a stadium can hold its breath and then remember a captain who never rushed the ending.",
    category: bySlug["moments"],
    author: "Archive Desk",
    publishedAt: "2026-10-28",
    featuredImage: media.hero,
    seoTitle: "The quiet that followed the last ball",
    seoDescription:
      "A fan essay on MS Dhoni's finishing calm and the silence after the winning run.",
    content: [
      {
        type: "paragraph",
        text: "This is placeholder essay copy for Phase 2. It stands in for Portable Text from Sanity. The tone is editorial, not official.",
      },
      {
        type: "heading",
        level: 2,
        text: "A finish without noise",
      },
      {
        type: "paragraph",
        text: "Fans still talk about the way Dhoni waited for the ball he wanted. The gloves, the glance, the single that felt larger than the scoreboard. This archive will hold those retellings without claiming ownership of the moments.",
      },
      {
        type: "image",
        src: media.crowd.src,
        alt: media.crowd.alt,
        caption: "Atmosphere photography for layout — replace with licensed gallery media later.",
      },
      {
        type: "heading",
        level: 3,
        text: "What the stands kept",
      },
      {
        type: "list",
        items: [
          "The long pause before a final over",
          "The helicopter finish as a shared memory, not a brand asset",
          "A captain who made pressure look ordinary",
        ],
      },
      {
        type: "paragraph",
        text: "When Sanity is connected, every paragraph, heading, list, and image here will come from the CMS. Links and bold text will be supported in the Portable Text renderer.",
      },
    ],
  },
  {
    id: "b02",
    title: "Captaincy as a kind of patience",
    slug: "captaincy-as-a-kind-of-patience",
    excerpt:
      "Field placements, soft words, and the habit of trusting the next over more than the last one.",
    category: bySlug["captaincy"],
    author: "Archive Desk",
    publishedAt: "2026-10-21",
    featuredImage: media.stands,
    seoTitle: "Captaincy as a kind of patience",
    seoDescription: "Notes on MS Dhoni's calm leadership style, written for a fan archive.",
    content: [
      {
        type: "paragraph",
        text: "Placeholder captaincy essay. Dhoni's leadership is remembered for stillness as much as for silverware.",
      },
      {
        type: "heading",
        level: 2,
        text: "Reading the ground",
      },
      {
        type: "paragraph",
        text: "From Ranchi to the world stage, the story fans retell is of a keeper who saw the whole field and rarely announced it. This page will deepen once CMS articles arrive.",
      },
    ],
  },
  {
    id: "b03",
    title: "Yellow nights and long roads home",
    slug: "yellow-nights-and-long-roads-home",
    excerpt:
      "A fan letter to the colour of Chennai evenings and the journeys that followed every tournament.",
    category: bySlug["legacy"],
    author: "Guest Fan",
    publishedAt: "2026-10-14",
    featuredImage: media.dusk,
    seoTitle: "Yellow nights and long roads home",
    seoDescription: "Legacy essay about CSK nights and MS Dhoni's pull on a generation of fans.",
    content: [
      {
        type: "paragraph",
        text: "Placeholder legacy piece. Gold on black is not decoration here — it is the memory of those nights.",
      },
    ],
  },
  {
    id: "b04",
    title: "Match note: when the chase looked finished",
    slug: "match-note-when-the-chase-looked-finished",
    excerpt:
      "A short match note on a chase that seemed gone, until the middle overs opened again.",
    category: bySlug["match-notes"],
    author: "Archive Desk",
    publishedAt: "2026-10-07",
    featuredImage: media.field,
    seoTitle: "Match note: when the chase looked finished",
    seoDescription: "Short match note placeholder for the MSD Archive blog.",
    content: [
      {
        type: "paragraph",
        text: "Placeholder match note. Rate, required runs, and the calm that made the arithmetic feel less cruel.",
      },
    ],
  },
  {
    id: "b05",
    title: "Keeping wicket as a second language",
    slug: "keeping-wicket-as-a-second-language",
    excerpt:
      "Gloves, edges, and the soft conversations a keeper has with the ball and the bowler.",
    category: bySlug["moments"],
    author: "Archive Desk",
    publishedAt: "2026-09-30",
    featuredImage: media.practice,
    seoTitle: "Keeping wicket as a second language",
    seoDescription: "Fan writing on MS Dhoni behind the stumps.",
    content: [
      {
        type: "paragraph",
        text: "Placeholder essay on keeping. The archive will later hold photos and notes that belong with this theme.",
      },
    ],
  },
  {
    id: "b06",
    title: "The dressing-room silence after a cup",
    slug: "the-dressing-room-silence-after-a-cup",
    excerpt:
      "On celebration that did not need volume, and the photographs fans still return to.",
    category: bySlug["legacy"],
    author: "Guest Fan",
    publishedAt: "2026-09-22",
    featuredImage: media.celebration,
    seoTitle: "The dressing-room silence after a cup",
    seoDescription: "A fan reflection on quiet celebration in MS Dhoni's career.",
    content: [
      {
        type: "paragraph",
        text: "Placeholder reflection. Cups mattered; the manner of holding them mattered more to many fans.",
      },
    ],
  },
  {
    id: "b07",
    title: "Why the helicopter still sounds like home",
    slug: "why-the-helicopter-still-sounds-like-home",
    excerpt:
      "A shot that became a shared vocabulary across balconies, bars, and late-night replays.",
    category: bySlug["moments"],
    author: "Archive Desk",
    publishedAt: "2026-09-15",
    featuredImage: media.pitchClose,
    seoTitle: "Why the helicopter still sounds like home",
    seoDescription: "On the helicopter shot as a fan memory, not a trademark claim.",
    content: [
      {
        type: "paragraph",
        text: "Placeholder moment essay. The shot is iconic; this site claims only the right to remember it as fans.",
      },
    ],
  },
  {
    id: "b08",
    title: "Leadership without the loud speech",
    slug: "leadership-without-the-loud-speech",
    excerpt:
      "How Dhoni's captaincy stories travel in small details: a nod, a bowling change, a long stare at midwicket.",
    category: bySlug["captaincy"],
    author: "Archive Desk",
    publishedAt: "2026-09-08",
    featuredImage: media.locker,
    seoTitle: "Leadership without the loud speech",
    seoDescription: "Captaincy notes for the unofficial MSD Archive.",
    content: [
      {
        type: "paragraph",
        text: "Placeholder captaincy notes. The CMS will allow longer Portable Text essays here.",
      },
    ],
  },
  {
    id: "b09",
    title: "Match note: rain, light, and a delayed start",
    slug: "match-note-rain-light-and-a-delayed-start",
    excerpt:
      "A weather-delayed evening and the patience that seemed to belong to one man in particular.",
    category: bySlug["match-notes"],
    author: "Guest Fan",
    publishedAt: "2026-09-01",
    featuredImage: media.rain,
    seoTitle: "Match note: rain, light, and a delayed start",
    seoDescription: "Match-night weather note for the fan archive.",
    content: [
      {
        type: "paragraph",
        text: "Placeholder match note about delayed starts and the calm that outlasted the covers.",
      },
    ],
  },
  {
    id: "b10",
    title: "Ranchi in the rear-view",
    slug: "ranchi-in-the-rear-view",
    excerpt:
      "Origin stories fans tell each other — railway platforms, local grounds, and the long climb out.",
    category: bySlug["legacy"],
    author: "Archive Desk",
    publishedAt: "2026-08-24",
    featuredImage: media.nightBowl,
    seoTitle: "Ranchi in the rear-view",
    seoDescription: "Fan storytelling about MS Dhoni's beginnings in Ranchi.",
    content: [
      {
        type: "paragraph",
        text: "Placeholder origin story. Verified biography belongs in CMS fields with careful sourcing.",
      },
    ],
  },
  {
    id: "b11",
    title: "The last over as a public square",
    slug: "the-last-over-as-a-public-square",
    excerpt:
      "Why the final six balls still gather strangers into the same shared silence.",
    category: bySlug["moments"],
    author: "Guest Fan",
    publishedAt: "2026-08-17",
    featuredImage: media.scoreboard,
    seoTitle: "The last over as a public square",
    seoDescription: "On last overs, crowds, and MS Dhoni's place in that ritual.",
    content: [
      {
        type: "paragraph",
        text: "Placeholder essay on last overs. Phase 4 will replace this with Sanity content.",
      },
    ],
  },
  {
    id: "b12",
    title: "What we mean when we say finish",
    slug: "what-we-mean-when-we-say-finish",
    excerpt:
      "A closing note on endings in cricket, and why Dhoni's finishes feel unfinished in the best way.",
    category: bySlug["captaincy"],
    author: "Archive Desk",
    publishedAt: "2026-08-10",
    featuredImage: media.crowd,
    seoTitle: "What we mean when we say finish",
    seoDescription: "Closing essay placeholder for the MSD Archive blog.",
    content: [
      {
        type: "paragraph",
        text: "Placeholder closing essay. Related articles below will also come from Sanity queries later.",
      },
    ],
  },
];

export const BLOGS_PER_PAGE = 9;

export function getBlogBySlug(slug: string) {
  return blogs.find((post) => post.slug === slug);
}

export function getRelatedBlogs(slug: string, limit = 3) {
  const current = getBlogBySlug(slug);
  if (!current) return [];

  return blogs
    .filter((post) => post.slug !== slug)
    .sort((a, b) => {
      const sameCategory =
        Number(b.category.slug === current.category.slug) -
        Number(a.category.slug === current.category.slug);
      if (sameCategory !== 0) return sameCategory;
      return b.publishedAt.localeCompare(a.publishedAt);
    })
    .slice(0, limit);
}

export function listBlogs(options?: { category?: string; page?: number }) {
  const category = options?.category;
  const page = Math.max(1, options?.page ?? 1);

  const filtered = blogs
    .filter((post) => (category ? post.category.slug === category : true))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / BLOGS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * BLOGS_PER_PAGE;

  return {
    posts: filtered.slice(start, start + BLOGS_PER_PAGE),
    total,
    totalPages,
    currentPage,
    category: category ?? null,
  };
}
