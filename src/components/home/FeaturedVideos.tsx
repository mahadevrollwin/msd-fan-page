"use client";

import { Play } from "lucide-react";
import { useCallback, useState } from "react";
import { VideoPlayerModal } from "@/components/gallery/VideoPlayerModal";
import { VideoThumbnail } from "@/components/gallery/VideoThumbnail";
import { AtmosphereSection } from "@/components/motion/AtmosphereSection";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import type { GalleryVideo } from "@/data/types";

type FeaturedVideosProps = {
  videos: GalleryVideo[];
};

export function FeaturedVideos({ videos }: FeaturedVideosProps) {
  const [activeVideo, setActiveVideo] = useState<GalleryVideo | null>(null);
  const closePlayer = useCallback(() => setActiveVideo(null), []);

  if (videos.length === 0) return null;

  return (
    <AtmosphereSection silhouette="left" figure="jog" tone="deep" strength={0.26} mirror={false}>
      <Container>
        <Reveal variant="blurUp">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              kicker="Featured video"
              title="Press play again"
              summary="You know how they end. That has never stopped anyone."
            />
            <ButtonLink href="/gallery/videos" variant="ghost" className="shrink-0 self-start sm:self-auto">
              Watch videos
            </ButtonLink>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {videos.map((video, index) => (
            <Reveal key={video.id} delay={index * 0.08} variant="fadeUp">
              <button
                type="button"
                className="group block w-full text-left"
                onClick={() => setActiveVideo(video)}
                aria-label={`Play ${video.title}`}
              >
                <div className="relative aspect-video overflow-hidden bg-ink">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-20 border border-gold/15 transition group-hover:border-gold/40"
                  />
                  <span className="absolute inset-0 transition duration-700 group-hover:scale-[1.04]">
                    <VideoThumbnail
                      video={video}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </span>
                  <span className="absolute inset-0 bg-pitch/35 transition group-hover:bg-pitch/15" />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid h-14 w-14 place-items-center border border-gold bg-pitch/70 text-gold shadow-[0_0_40px_rgb(228_180_35/0.15)] transition duration-500 group-hover:scale-105 group-hover:bg-gold group-hover:text-pitch">
                      <Play aria-hidden="true" size={22} fill="currentColor" />
                    </span>
                  </span>
                </div>
                <h3 className="mt-5 font-display text-3xl tracking-[0.04em] text-cream transition group-hover:text-gold">
                  {video.title}
                </h3>
                {video.description ? (
                  <p className="mt-2 text-sm leading-6 text-mist">{video.description}</p>
                ) : null}
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      {activeVideo ? (
        <VideoPlayerModal video={activeVideo} onClose={closePlayer} />
      ) : null}
    </AtmosphereSection>
  );
}
