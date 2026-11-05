"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { VideoThumbnail } from "@/components/gallery/VideoThumbnail";
import { Reveal } from "@/components/ui/Reveal";
import type { GalleryImage, GalleryVideo } from "@/data/types";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/format";
import {
  isFallbackVideoThumbnail,
  resolvePlatformPoster,
  resolveVideoPlayback,
} from "@/lib/video";

type GalleryExperienceProps = {
  images: GalleryImage[];
  videos: GalleryVideo[];
  initialTab?: "images" | "videos";
};

type GalleryTab = "images" | "videos";

const TAB_PATH: Record<GalleryTab, string> = {
  images: "/gallery",
  videos: "/gallery/videos",
};

export function GalleryExperience({
  images,
  videos,
  initialTab = "images",
}: GalleryExperienceProps) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [tab, setTab] = useState<GalleryTab>(initialTab);
  const [tabSource, setTabSource] = useState(initialTab);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<GalleryVideo | null>(null);
  const [videoError, setVideoError] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const imagesTabId = useId();
  const videosTabId = useId();
  const imagesPanelId = useId();
  const videosPanelId = useId();
  const dialogTitleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const fileVideoRef = useRef<HTMLVideoElement>(null);

  if (tabSource !== initialTab) {
    setTabSource(initialTab);
    setTab(initialTab);
  }

  const activeImage = useMemo(
    () => (lightboxIndex === null ? null : images[lightboxIndex] ?? null),
    [images, lightboxIndex],
  );

  const playback = activeVideo ? resolveVideoPlayback(activeVideo) : null;

  function selectTab(next: GalleryTab) {
    setTab(next);
    setLightboxIndex(null);
    setActiveVideo(null);
    router.replace(TAB_PATH[next], { scroll: false });
  }

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

      if (lightboxIndex === null || images.length === 0) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setLightboxIndex((index) =>
          index === null ? null : (index + 1) % images.length,
        );
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setLightboxIndex((index) =>
          index === null ? null : (index - 1 + images.length) % images.length,
        );
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button, [href], video, iframe, [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((node) => !node.hasAttribute("disabled"));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [activeVideo, images.length, lightboxIndex]);

  // User opened the modal via click — play unmuted so audio is not stuck off.
  useEffect(() => {
    if (!activeVideo || !playback || playback.kind !== "file") return;
    const el = fileVideoRef.current;
    if (!el) return;

    el.defaultMuted = false;
    el.muted = false;
    el.volume = 1;

    const start = async () => {
      try {
        await el.play();
      } catch {
        // Autoplay may still be blocked; leave controls unmuted for a tap.
        el.muted = false;
        el.volume = 1;
      } finally {
        setVideoLoading(false);
      }
    };

    void start();
  }, [activeVideo, playback]);

  function openVideo(video: GalleryVideo) {
    setVideoError(false);
    setVideoLoading(true);
    setActiveVideo(video);
  }

  const modalPoster = activeVideo
    ? isFallbackVideoThumbnail(activeVideo.thumbnail.src)
      ? (resolvePlatformPoster(activeVideo) ?? undefined)
      : activeVideo.thumbnail.src
    : undefined;

  return (
    <div>
      <Reveal variant="fadeUp">
        <div
          className="inline-flex gap-1 border border-gold/20 bg-charcoal/50 p-1 backdrop-blur-sm"
          role="tablist"
          aria-label="Gallery media"
        >
          {(
            [
              ["images", "Images", imagesTabId, imagesPanelId, images.length],
              ["videos", "Videos", videosTabId, videosPanelId, videos.length],
            ] as const
          ).map(([value, label, tabId, panelId, count]) => (
            <button
              key={value}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={tab === value}
              aria-controls={panelId}
              className={cn(
                "relative inline-flex min-h-11 items-center gap-2 px-5 text-xs uppercase tracking-[0.2em] transition-colors",
                tab === value
                  ? "text-pitch"
                  : "text-mist hover:text-gold",
              )}
              onClick={() => selectTab(value)}
            >
              {tab === value ? (
                <motion.span
                  layoutId={reduceMotion ? undefined : "gallery-tab-pill"}
                  className="absolute inset-0 bg-gold"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              ) : null}
              <span className="relative z-10">{label}</span>
              <span className="relative z-10 text-[0.65rem] tracking-[0.12em] opacity-80">
                {count}
              </span>
            </button>
          ))}
        </div>
      </Reveal>

      <AnimatePresence mode="wait">
        {tab === "images" ? (
          <motion.div
            key="images"
            id={imagesPanelId}
            role="tabpanel"
            aria-labelledby={imagesTabId}
            className="mt-12"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {images.length === 0 ? (
              <p className="border border-dashed border-gold/30 p-8 font-serif text-lg text-mist">
                No gallery images yet. Publish stills in Sanity Studio to fill this tab.
              </p>
            ) : (
              <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
                {images.map((image, index) => (
                  <Reveal key={image.id} delay={Math.min(index * 0.04, 0.28)} variant="scaleIn">
                    <button
                      type="button"
                      className="group relative mb-5 block w-full break-inside-avoid overflow-hidden bg-ink text-left ring-1 ring-gold/10 transition duration-500 hover:ring-gold/35"
                      onClick={() => setLightboxIndex(index)}
                    >
                      <Image
                        src={image.image.src}
                        alt={image.altText}
                        width={900}
                        height={index % 3 === 0 ? 1100 : 700}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-pitch/90 via-pitch/10 to-transparent opacity-95" />
                      <span className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                        <span className="block font-display text-2xl tracking-[0.05em] text-cream sm:text-3xl">
                          {image.title}
                        </span>
                        {image.description ? (
                          <span className="mt-1 block text-sm text-mist">
                            {image.description}
                          </span>
                        ) : null}
                        {image.category ? (
                          <span className="mt-2 block text-[0.65rem] uppercase tracking-[0.18em] text-gold">
                            {image.category}
                          </span>
                        ) : null}
                      </span>
                    </button>
                  </Reveal>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="videos"
            id={videosPanelId}
            role="tabpanel"
            aria-labelledby={videosTabId}
            className="mt-12"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {videos.length === 0 ? (
              <p className="border border-dashed border-gold/30 p-8 font-serif text-lg text-mist">
                No gallery videos yet. Add uploaded files or external URLs in Studio.
              </p>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {videos.map((video, index) => {
                  const kind = resolveVideoPlayback(video)?.kind;
                  return (
                    <Reveal key={video.id} delay={Math.min(index * 0.05, 0.3)} variant="fadeUp">
                      <button
                        type="button"
                        className="group text-left"
                        onClick={() => openVideo(video)}
                      >
                        <span className="relative block aspect-video overflow-hidden bg-ink ring-1 ring-gold/10 transition duration-500 group-hover:ring-gold/35">
                          <span className="absolute inset-0 transition duration-700 group-hover:scale-[1.04]">
                            <VideoThumbnail
                              video={video}
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </span>
                          <span className="absolute inset-0 grid place-items-center bg-pitch/35 transition group-hover:bg-pitch/15">
                            <span className="grid h-14 w-14 place-items-center border border-gold bg-pitch/70 text-gold shadow-[0_0_36px_rgb(228_180_35/0.18)] transition duration-500 group-hover:scale-105 group-hover:bg-gold group-hover:text-pitch">
                              <Play aria-hidden="true" size={22} fill="currentColor" />
                            </span>
                          </span>
                        </span>
                        <span className="mt-5 block font-display text-3xl tracking-[0.04em] text-cream transition group-hover:text-gold">
                          {video.title}
                        </span>
                        {video.description ? (
                          <span className="mt-2 block text-sm leading-6 text-mist">
                            {video.description}
                          </span>
                        ) : null}
                        <span className="mt-2 block text-[0.7rem] uppercase tracking-[0.18em] text-gold">
                          {kind === "youtube"
                            ? "YouTube"
                            : kind === "vimeo"
                              ? "Vimeo"
                              : video.videoFile
                                ? "Uploaded file"
                                : "Video file"}{" "}
                          · {formatDate(video.publishedAt)}
                        </span>
                      </button>
                    </Reveal>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {activeImage && lightboxIndex !== null ? (
        <div
          ref={dialogRef}
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
                <h3
                  id={dialogTitleId}
                  className="font-display text-3xl tracking-[0.05em] text-cream"
                >
                  {activeImage.title}
                </h3>
                {activeImage.description ? (
                  <p className="mt-1 text-sm text-mist">{activeImage.description}</p>
                ) : null}
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
                    index === null
                      ? null
                      : (index - 1 + images.length) % images.length,
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
          ref={dialogRef}
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
                <h3
                  id={dialogTitleId}
                  className="font-display text-3xl tracking-[0.05em] text-cream"
                >
                  {activeVideo.title}
                </h3>
                {activeVideo.description ? (
                  <p className="mt-1 text-sm text-mist">{activeVideo.description}</p>
                ) : null}
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
              {videoLoading && !videoError && playback?.kind === "file" ? (
                <p className="absolute inset-0 grid place-items-center text-sm uppercase tracking-[0.18em] text-mist">
                  Loading video…
                </p>
              ) : null}
              {videoError || !playback ? (
                <p className="absolute inset-0 grid place-items-center p-6 text-center font-serif text-lg text-mist">
                  This clip could not be loaded. Try another video or check the source URL.
                </p>
              ) : playback.kind === "youtube" || playback.kind === "vimeo" ? (
                <iframe
                  key={activeVideo.id}
                  title={activeVideo.title}
                  src={playback.embedUrl}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  onLoad={() => setVideoLoading(false)}
                />
              ) : (
                <video
                  key={activeVideo.id}
                  ref={fileVideoRef}
                  className="h-full w-full"
                  controls
                  playsInline
                  preload="auto"
                  muted={false}
                  poster={modalPoster}
                  onLoadedData={(event) => {
                    const el = event.currentTarget;
                    el.muted = false;
                    el.defaultMuted = false;
                    el.volume = 1;
                    setVideoLoading(false);
                  }}
                  onError={() => {
                    setVideoLoading(false);
                    setVideoError(true);
                  }}
                >
                  <source src={playback.src} />
                </video>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
