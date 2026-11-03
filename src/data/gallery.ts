import { media, sampleExternalVideo, sampleVideoFile } from "@/data/media";
import type { GalleryImage, GalleryVideo } from "@/data/types";

export const galleryImages: GalleryImage[] = [
  {
    id: "gi1",
    title: "Floodlit evening",
    description: "Stadium lights before the first ball. Atmosphere placeholder.",
    category: "Stadium",
    altText: media.hero.alt,
    publishedAt: "2026-10-01",
    image: media.hero,
  },
  {
    id: "gi2",
    title: "Boundary grass",
    description: "Close texture of bat and ball for editorial layouts.",
    category: "Detail",
    altText: media.pitchClose.alt,
    publishedAt: "2026-09-28",
    image: media.pitchClose,
  },
  {
    id: "gi3",
    title: "The stands rise",
    description: "Crowd under lights — stand-in until licensed stills arrive.",
    category: "Crowd",
    altText: media.crowd.alt,
    publishedAt: "2026-09-20",
    image: media.crowd,
  },
  {
    id: "gi4",
    title: "Empty seats, waiting",
    description: "Quiet bowls before a yellow night.",
    category: "Stadium",
    altText: media.stands.alt,
    publishedAt: "2026-09-12",
    image: media.stands,
  },
  {
    id: "gi5",
    title: "Outfield stretch",
    description: "Wide outfield for gallery masonry testing.",
    category: "Field",
    altText: media.field.alt,
    publishedAt: "2026-09-05",
    image: media.field,
  },
  {
    id: "gi6",
    title: "Dusk over the ground",
    description: "Warm floodlight spill at dusk.",
    category: "Light",
    altText: media.dusk.alt,
    publishedAt: "2026-08-29",
    image: media.dusk,
  },
  {
    id: "gi7",
    title: "Practice lane",
    description: "Nets and gear as a training-day stand-in.",
    category: "Practice",
    altText: media.practice.alt,
    publishedAt: "2026-08-21",
    image: media.practice,
  },
  {
    id: "gi8",
    title: "After the win",
    description: "Celebration energy without claiming a specific match photo.",
    category: "Moments",
    altText: media.celebration.alt,
    publishedAt: "2026-08-14",
    image: media.celebration,
  },
  {
    id: "gi9",
    title: "Night session",
    description: "Floodlights cutting across a sports field.",
    category: "Night",
    altText: media.nightBowl.alt,
    publishedAt: "2026-08-07",
    image: media.nightBowl,
  },
];

export const galleryVideos: GalleryVideo[] = [
  {
    id: "gv1",
    title: "Bowling action study",
    description: "External Wikimedia clip used as a URL-based video placeholder.",
    category: "Technique",
    publishedAt: "2026-10-02",
    thumbnail: media.practice,
    videoUrl: sampleExternalVideo,
  },
  {
    id: "gv2",
    title: "Archive sample reel",
    description: "Open-source sample file standing in for an uploaded Sanity video.",
    category: "Archive",
    publishedAt: "2026-09-18",
    thumbnail: media.hero,
    videoFile: sampleVideoFile,
  },
  {
    id: "gv3",
    title: "Night ground walkthrough",
    description: "Second uploaded-file placeholder for modal playback testing.",
    category: "Atmosphere",
    publishedAt: "2026-09-01",
    thumbnail: media.dusk,
    videoFile: sampleVideoFile,
  },
  {
    id: "gv4",
    title: "Field texture loop",
    description: "External URL example with a different thumbnail treatment.",
    category: "Field",
    publishedAt: "2026-08-20",
    thumbnail: media.field,
    videoUrl: sampleExternalVideo,
  },
  {
    id: "gv5",
    title: "Crowd murmur stand-in",
    description: "Placeholder for a fan-shot video that will arrive via CMS.",
    category: "Crowd",
    publishedAt: "2026-08-08",
    thumbnail: media.crowd,
    videoFile: sampleVideoFile,
  },
  {
    id: "gv6",
    title: "Lights up",
    description: "Final video tile for a full responsive grid.",
    category: "Stadium",
    publishedAt: "2026-07-30",
    thumbnail: media.nightBowl,
    videoUrl: sampleExternalVideo,
  },
];

export function getGalleryImage(id: string) {
  return galleryImages.find((image) => image.id === id);
}

export function getGalleryVideo(id: string) {
  return galleryVideos.find((video) => video.id === id);
}
