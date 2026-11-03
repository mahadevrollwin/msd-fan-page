import type { Metadata } from "next";
import { Suspense } from "react";
import { GalleryExperience } from "@/components/gallery/GalleryExperience";
import { PageFrame } from "@/components/layout/PageFrame";
import { buildPageMetadata } from "@/lib/seo";
import { getGalleryContent } from "@/sanity/lib/fetch";

type GalleryPageProps = {
  searchParams: Promise<{ tab?: string }>;
};

export async function generateMetadata({
  searchParams,
}: GalleryPageProps): Promise<Metadata> {
  const params = await searchParams;
  const isVideos = params.tab === "videos";

  return buildPageMetadata({
    title: isVideos ? "Gallery · Videos" : "Gallery",
    description:
      "Image and video gallery for an unofficial MS Dhoni fan page, with lightbox and playback modals.",
    path: isVideos ? "/gallery?tab=videos" : "/gallery",
  });
}

async function GallerySection({ searchParams }: GalleryPageProps) {
  const params = await searchParams;
  const initialTab = params.tab === "videos" ? "videos" : "images";
  const gallery = await getGalleryContent();

  return (
    <GalleryExperience
      images={gallery.images}
      videos={gallery.videos}
      initialTab={initialTab}
    />
  );
}

export default function GalleryPage({ searchParams }: GalleryPageProps) {
  return (
    <PageFrame
      kicker="The frames"
      title="Gallery"
      summary="Images open in a lightbox; videos play in a modal. Tabs update the URL without reloading the page."
    >
      <Suspense
        fallback={
          <div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            aria-busy="true"
            aria-label="Loading gallery"
          >
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
