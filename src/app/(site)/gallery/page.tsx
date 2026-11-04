import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { GalleryPageView } from "@/components/gallery/GalleryPageView";
import { buildPageMetadata } from "@/lib/seo";

type GalleryPageProps = {
  searchParams: Promise<{ tab?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Gallery",
    description:
      "Still frames from an unofficial MS Dhoni fan archive — browse images with a lightbox viewer.",
    path: "/gallery",
  });
}

/** Legacy ?tab=videos bookmarks permanently redirect to the clean path. */
export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const params = await searchParams;
  if (params.tab === "videos") {
    redirect("/gallery/videos");
  }

  return <GalleryPageView initialTab="images" />;
}
