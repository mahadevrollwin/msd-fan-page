"use client";

import Image from "next/image";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { GalleryImage, GalleryVideo } from "@/data/types";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/cn";

type GalleryExperienceProps = {
  images: GalleryImage[];
  videos: GalleryVideo[];
  initialTab?: "images" | "videos";
};

function resolveVideoSrc(video: GalleryVideo) {
  return video.videoFile || video.videoUrl || null;
}

export function GalleryExperience({
  images,
  videos,
  initialTab = "images",
}: GalleryExperienceProps) {
  const [tab, setTab] = useState<"images" | "videos">(initialTab);
  const [tabSource, setTabSource] = useState(initialTab);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<GalleryVideo | null>(null);
  const [videoError, setVideoError] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const dialogTitleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  if (tabSource !== initialTab) {
    setTabSource(initialTab);
    setTab(initialTab);
  }

  const activeImage = useMemo(
    () => (lightboxIndex === null ? null : images[lightboxIndex] ?? null),
    [images, lightboxIndex],
  );

  useEffect(() => {
    if (lightboxIndex === null && !activeVideo) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
        setActiveVideo(null);
        return;
      }
      if (lightboxIndex === null) return;
      if (event.key === "ArrowRight") {
        setLightboxIndex((index) =>
          index === null ? null : (index + 1) % images.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex((index) =>
          index === null ? null : (index - 1 + images.length) % images.length,
        );
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [activeVideo, images.length, lightboxIndex]);

  function openVideo(video: GalleryVideo) {
    setVideoError(false);
    setVideoLoading(true);
    setActiveVideo(video);
  }

  return (
    <div>
      <div className="flex gap-2" role="tablist" aria-label="Gallery media">
        {(
          [
            ["images", "Images"],
            ["videos", "Videos"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={tab === value}
            className={cn(
              "inline-flex min-h-11 items-center border px-5 text-xs uppercase tracking-[0.2em] transition-colors",
              tab === value
                ? "border-gold bg-gold text-pitch"
                : "border-white/15 text-mist hover:border-gold hover:text-gold",
            )}
            onClick={() => setTab(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-10" role="tabpanel">
        {tab === "images" ? (
          images.length === 0 ? (
            <p className="border border-dashed border-gold/30 p-8 font-serif text-lg text-mist">
              No gallery images yet.
            </p>
          ) : (
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  className="group relative mb-4 block w-full break-inside-avoid overflow-hidden bg-ink text-left"
                  onClick={() => setLightboxIndex(index)}
                >
                  <Image
                    src={image.image.src}
                    alt={image.altText}
                    width={900}
                    height={index % 3 === 0 ? 1100 : 700}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-pitch/85 via-transparent to-transparent opacity-90" />
                  <span className="absolute inset-x-0 bottom-0 p-4">
                    <span className="block font-display text-2xl tracking-[0.05em] text-cream">
                      {image.title}
                    </span>
                    {image.description ? (
                      <span className="mt-1 block text-sm text-mist">{image.description}</span>
                    ) : null}
                  </span>
                </button>
              ))}
            </div>
          )
        ) : videos.length === 0 ? (
          <p className="border border-dashed border-gold/30 p-8 font-serif text-lg text-mist">
            No gallery videos yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <button
                key={video.id}
                type="button"
                className="group text-left"
                onClick={() => openVideo(video)}
              >
                <span className="relative block aspect-video overflow-hidden bg-ink">
                  <Image
                    src={video.thumbnail.src}
                    alt={video.thumbnail.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-0 grid place-items-center bg-pitch/35 transition group-hover:bg-pitch/15">
                    <span className="grid h-14 w-14 place-items-center border border-gold bg-pitch/70 text-gold transition group-hover:bg-gold group-hover:text-pitch">
                      <Play aria-hidden="true" size={22} fill="currentColor" />
                    </span>
                  </span>
                </span>
                <span className="mt-4 block font-display text-3xl tracking-[0.04em] text-cream group-hover:text-gold">
                  {video.title}
                </span>
                <span className="mt-2 block text-sm leading-6 text-mist">{video.description}</span>
                <span className="mt-2 block text-[0.7rem] uppercase tracking-[0.18em] text-gold">
                  {video.videoFile ? "Uploaded file" : "External URL"} · {formatDate(video.publishedAt)}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {activeImage && lightboxIndex !== null ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-pitch/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogTitleId}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close lightbox backdrop"
            onClick={() => setLightboxIndex(null)}
          />
          <div className="relative z-10 flex w-full max-w-5xl flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 id={dialogTitleId} className="font-display text-3xl tracking-[0.05em] text-cream">
                  {activeImage.title}
                </h3>
                <p className="mt-1 text-sm text-mist">{activeImage.description}</p>
              </div>
              <button
                ref={closeRef}
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center border border-gold/50 text-cream"
                onClick={() => setLightboxIndex(null)}
              >
                <X aria-hidden="true" size={18} />
                <span className="sr-only">Close</span>
              </button>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden bg-ink">
              <Image
                src={activeImage.image.src}
                alt={activeImage.altText}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                className="inline-flex min-h-11 items-center gap-2 border border-white/15 px-4 text-xs uppercase tracking-[0.18em] text-cream hover:border-gold hover:text-gold"
                onClick={() =>
                  setLightboxIndex((index) =>
                    index === null ? null : (index - 1 + images.length) % images.length,
                  )
                }
              >
                <ChevronLeft aria-hidden="true" size={16} />
                Previous
              </button>
              <p className="text-sm text-muted">
                {lightboxIndex + 1} / {images.length}
              </p>
              <button
                type="button"
                className="inline-flex min-h-11 items-center gap-2 border border-white/15 px-4 text-xs uppercase tracking-[0.18em] text-cream hover:border-gold hover:text-gold"
                onClick={() =>
                  setLightboxIndex((index) =>
                    index === null ? null : (index + 1) % images.length,
                  )
                }
              >
                Next
                <ChevronRight aria-hidden="true" size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {activeVideo ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-pitch/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogTitleId}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close video backdrop"
            onClick={() => setActiveVideo(null)}
          />
          <div className="relative z-10 w-full max-w-4xl border border-gold/20 bg-charcoal p-4 sm:p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 id={dialogTitleId} className="font-display text-3xl tracking-[0.05em] text-cream">
                  {activeVideo.title}
                </h3>
                <p className="mt-1 text-sm text-mist">{activeVideo.description}</p>
              </div>
              <button
                ref={closeRef}
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center border border-gold/50 text-cream"
                onClick={() => setActiveVideo(null)}
              >
                <X aria-hidden="true" size={18} />
                <span className="sr-only">Close</span>
              </button>
            </div>
            <div className="relative aspect-video overflow-hidden bg-pitch">
              {videoLoading && !videoError ? (
                <p className="absolute inset-0 grid place-items-center text-sm uppercase tracking-[0.18em] text-mist">
                  Loading video…
                </p>
              ) : null}
              {videoError || !resolveVideoSrc(activeVideo) ? (
                <p className="absolute inset-0 grid place-items-center p-6 text-center font-serif text-lg text-mist">
                  This clip could not be loaded. Try another video or check the source URL.
                </p>
              ) : (
                <video
                  key={activeVideo.id}
                  className="h-full w-full"
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  poster={activeVideo.thumbnail.src}
                  onLoadedData={() => setVideoLoading(false)}
                  onError={() => {
                    setVideoLoading(false);
                    setVideoError(true);
                  }}
                >
                  <source src={resolveVideoSrc(activeVideo) ?? undefined} />
                </video>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
