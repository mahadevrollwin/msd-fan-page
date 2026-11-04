import { Suspense } from "react";
import { GalleryExperience } from "@/components/gallery/GalleryExperience";
import { PageFrame } from "@/components/layout/PageFrame";
import { getGalleryContent } from "@/sanity/lib/fetch";

type GalleryPageViewProps = {
  initialTab: "images" | "videos";
  title?: string;
  summary?: string;
};

async function GallerySection({
  initialTab,
}: {
  initialTab: "images" | "videos";
}) {
  const gallery = await getGalleryContent();

  return (
    <GalleryExperience
      images={gallery.images}
      videos={gallery.videos}
      initialTab={initialTab}
    />
  );
}

export function GalleryPageView({
  initialTab,
  title = "Gallery",
  summary = "Images open in a lightbox; videos play in a modal. Tabs keep a clean /gallery or /gallery/videos URL.",
}: GalleryPageViewProps) {
  return (
    <PageFrame
      kicker="The frames"
      title={title}
      summary={summary}
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
        <GallerySection initialTab={initialTab} />
      </Suspense>
    </PageFrame>
  );
}
