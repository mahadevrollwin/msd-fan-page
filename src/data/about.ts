import { media } from "@/data/media";
import type { CareerHighlight } from "@/data/types";

export const aboutContent = {
  hero: {
    kicker: "The record",
    title: "About this fan page",
    summary:
      "MSD Archive is an unofficial home for writing and media about MS Dhoni's cricket life. Every section below is placeholder content that Sanity will own in a later phase.",
  },
  fanPage: {
    title: "Why the archive exists",
    paragraphs: [
      "Fans needed a place that felt cinematic without pretending to be official. This site is that place: dark frames, gold accents, and room for long memory.",
      "Nothing here is endorsed by MS Dhoni, his representatives, Chennai Super Kings, or any cricket board. Attribution and licensing for media will be handled carefully when the CMS is live.",
    ],
    image: media.locker,
  },
  journey: {
    title: "MS Dhoni's cricket journey",
    summary:
      "From Ranchi grounds to world finals, the journey is told here as fan storytelling. Verified timelines will be edited in Sanity.",
    image: media.field,
    beats: [
      {
        title: "The climb",
        text: "Local cricket, railway stories, and the first gloves that made national selectors look twice.",
      },
      {
        title: "The captaincy years",
        text: "White-ball leadership that valued calm over volume, and results that still shape how fans talk about finishing.",
      },
      {
        title: "The league nights",
        text: "Yellow stands, long seasons, and a loyalty that outlived individual tournaments.",
      },
    ],
  },
  milestones: [
    {
      year: "2004–07",
      title: "Arrival and first cup",
      summary: "Placeholder milestone block for international arrival and the 2007 T20 triumph.",
    },
    {
      year: "2011",
      title: "Home World Cup",
      summary: "Placeholder for the tournament finish that became a national shared memory.",
    },
    {
      year: "2013–18",
      title: "White-ball craft",
      summary: "Placeholder for Champions Trophy nights and the later white-ball chapters.",
    },
    {
      year: "League era",
      title: "CSK captaincy",
      summary: "Placeholder for league leadership, returns, and the culture around jersey 07.",
    },
  ] satisfies CareerHighlight[],
  legacy: {
    title: "Achievements and legacy",
    summary:
      "Cups matter. So do the quieter habits: finishing without panic, keeping without theatre, leading without a speech every over.",
    points: [
      "Multiple ICC trophies as captain, remembered here as fan history",
      "A keeping and finishing language that entered everyday cricket talk",
      "A league identity that millions still wear without needing permission from this site",
      "An unofficial archive that aims to stay respectful, accurate, and clearly fan-made",
    ],
    image: media.celebration,
  },
};
