import type { Metadata } from "next";
import { Suspense } from "react";
import { GalleryExperience } from "@/components/gallery/GalleryExperience";
import { PageFrame } from "@/components/layout/PageFrame";
import { galleryImages, galleryVideos } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Image and video gallery for an unofficial MS Dhoni fan page, with lightbox and playback modals.",
};

type GalleryPageProps = {
  searchParams: Promise<{ tab?: string }>;
};

async function GallerySection({ searchParams }: GalleryPageProps) {
  const params = await searchParams;
  const initialTab = params.tab === "videos" ? "videos" : "images";

  return (
    <GalleryExperience
      images={galleryImages}
      videos={galleryVideos}
      initialTab={initialTab}
    />
  );
}

export default function GalleryPage({ searchParams }: GalleryPageProps) {
  return (
    <PageFrame
      kicker="The frames"
      title="Gallery"
      summary="Switch between stills and film without leaving the page. Atmosphere media is temporary until Sanity assets arrive."
    >
      <Suspense
        fallback={
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="aspect-[4/3] bg-cream/10" />
            ))}
          </div>
        }
      >
        <GallerySection searchParams={searchParams} />
      </Suspense>
    </PageFrame>
  );
}
