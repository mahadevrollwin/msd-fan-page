"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { GalleryVideo } from "@/data/types";
import {
  isFallbackVideoThumbnail,
  resolvePlatformPoster,
  resolveVideoPlayback,
} from "@/lib/video";

type VideoPlayerModalProps = {
  video: GalleryVideo;
  onClose: () => void;
};

/** Fullscreen modal player used on the homepage and gallery video tab. */
export function VideoPlayerModal({ video, onClose }: VideoPlayerModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const fileVideoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  const playback = resolveVideoPlayback(video);
  const poster = isFallbackVideoThumbnail(video.thumbnail.src)
    ? (resolvePlatformPoster(video) ?? undefined)
    : video.thumbnail.src;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
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
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  useEffect(() => {
    if (!playback || playback.kind !== "file") return;
    const el = fileVideoRef.current;
    if (!el) return;

    el.defaultMuted = false;
    el.muted = false;
    el.volume = 1;

    const start = async () => {
      try {
        await el.play();
      } catch {
        el.muted = false;
        el.volume = 1;
      } finally {
        setVideoLoading(false);
      }
    };

    void start();
  }, [playback, video.id]);

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-pitch/95 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close video backdrop"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-4xl border border-gold/20 bg-charcoal p-4 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3
              id={titleId}
              className="font-display text-3xl tracking-[0.05em] text-cream"
            >
              {video.title}
            </h3>
            {video.description ? (
              <p className="mt-1 text-sm text-mist">{video.description}</p>
            ) : null}
          </div>
          <button
            ref={closeRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-gold/50 text-cream"
            onClick={onClose}
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
              This clip could not be loaded. Try another video or check the source
              URL.
            </p>
          ) : playback.kind === "youtube" || playback.kind === "vimeo" ? (
            <iframe
              key={video.id}
              title={video.title}
              src={playback.embedUrl}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={() => setVideoLoading(false)}
            />
          ) : (
            <video
              key={video.id}
              ref={fileVideoRef}
              className="h-full w-full"
              controls
              playsInline
              preload="auto"
              muted={false}
              poster={poster}
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
  );
}
