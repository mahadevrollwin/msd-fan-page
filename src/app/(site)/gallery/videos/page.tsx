import type { Metadata } from "next";
import { GalleryPageView } from "@/components/gallery/GalleryPageView";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Gallery · Videos",
    description:
      "Video clips from an unofficial MS Dhoni fan archive — watch uploads and streams in a modal player.",
    path: "/gallery/videos",
  });
}

export default function GalleryVideosPage() {
  return (
    <GalleryPageView
      initialTab="videos"
      title="Gallery · Videos"
      summary="Play clips in a modal. Switch to stills anytime — the URL stays clean at /gallery/videos."
    />
  );
}
