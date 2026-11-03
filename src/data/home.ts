import { blogs } from "@/data/blogs";
import { galleryImages, galleryVideos } from "@/data/gallery";
import { media } from "@/data/media";
import type { CareerHighlight, FeaturedMoment } from "@/data/types";

export const homeContent = {
  hero: {
    kicker: "Unofficial fan archive",
    brand: "MSD Archive",
    heading: "From the stands.",
    description:
      "Stories, pictures, and the long memory of a captain — made by fans, never claiming to be official.",
    primaryCta: { label: "Read the blogs", href: "/blogs" as const },
    secondaryCta: { label: "Open the gallery", href: "/gallery" as const },
    image: media.hero,
  },
  moments: [
    {
      id: "m1",
      title: "The final over, held still",
      year: "World nights",
      summary:
        "A placeholder for the finishes fans still argue about in the best way — calm gloves, late runs, quiet exits.",
      image: media.crowd,
    },
    {
      id: "m2",
      title: "Yellow under the lights",
      year: "League evenings",
      summary:
        "Chennai nights as atmosphere, not ownership. Licensed stills will replace this Unsplash stand-in.",
      image: media.dusk,
    },
    {
      id: "m3",
      title: "The long road from Ranchi",
      year: "Beginnings",
      summary:
        "Origin chapters belong in the CMS. This block proves the editorial rhythm of the home page.",
      image: media.practice,
    },
  ] satisfies FeaturedMoment[],
  highlights: [
    {
      year: "2007",
      title: "T20 World Cup",
      summary: "A young captain, a new format, and a trophy that still opens every conversation.",
    },
    {
      year: "2011",
      title: "World Cup at home",
      summary: "The finish that lives in replay culture. Details will be editable from Sanity.",
    },
    {
      year: "2013",
      title: "Champions Trophy",
      summary: "Another global night filed under calm decision-making and sharp gloves.",
    },
    {
      year: "League",
      title: "CSK captaincy",
      summary: "Yellow nights, long loyalties, and a fan language this archive will keep carefully unofficial.",
    },
  ] satisfies CareerHighlight[],
  aboutPreview: {
    kicker: "About the archive",
    title: "A fan page with a long memory",
    summary:
      "MSD Archive collects essays, stills, and film about MS Dhoni's career. It is edited by fans, powered later by Sanity, and never presents itself as an official channel.",
    image: media.stands,
    cta: { label: "Read the about page", href: "/about" as const },
  },
  featuredBlogs: blogs.slice(0, 3),
  featuredImages: galleryImages.slice(0, 4),
  featuredVideos: galleryVideos.slice(0, 3),
};
