"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { GalleryVideo } from "@/data/types";
import { cn } from "@/lib/cn";
import {
  isFallbackVideoThumbnail,
  resolvePlatformPoster,
  resolveVideoPlayback,
} from "@/lib/video";

type VideoThumbnailProps = {
  video: GalleryVideo;
  sizes: string;
  className?: string;
  priority?: boolean;
};

/**
 * Prefers a Studio still; otherwise YouTube poster or a paused frame from the
 * uploaded file. Sanity file CDN has no CORS ACAO, so we never set
 * crossOrigin — that would blank the <video> paint entirely.
 */
export function VideoThumbnail({
  video,
  sizes,
  className,
  priority = false,
}: VideoThumbnailProps) {
  const playback = resolveVideoPlayback(video);
  const platformPoster = resolvePlatformPoster(video);
  const hasStudioThumb = !isFallbackVideoThumbnail(video.thumbnail.src);

  if (hasStudioThumb) {
    return (
      <Image
        src={video.thumbnail.src}
        alt={video.thumbnail.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
        {...(video.thumbnail.blurDataURL
          ? {
              placeholder: "blur" as const,
              blurDataURL: video.thumbnail.blurDataURL,
            }
          : {})}
      />
    );
  }

  if (platformPoster) {
    return (
      <Image
        src={platformPoster}
        alt={video.thumbnail.alt || video.title}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }

  if (playback?.kind === "file") {
    return (
      <VideoFrameThumb
        src={playback.src}
        alt={video.thumbnail.alt || video.title}
        className={className}
      />
    );
  }

  return (
    <Image
      src={video.thumbnail.src}
      alt={video.thumbnail.alt}
      fill
      sizes={sizes}
      className={cn("object-cover", className)}
    />
  );
}

function VideoFrameThumb({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const seekToPreview = () => {
      try {
        const target =
          Number.isFinite(video.duration) && video.duration > 0
            ? Math.min(1.25, Math.max(0.15, video.duration * 0.12))
            : 0.4;
        if (Math.abs(video.currentTime - target) > 0.05) {
          video.currentTime = target;
        }
      } catch {
        // Seeking can fail before enough data is buffered; first frame still paints.
      }
    };

    video.addEventListener("loadedmetadata", seekToPreview);
    video.addEventListener("loadeddata", seekToPreview);
    if (video.readyState >= 1) seekToPreview();

    return () => {
      video.removeEventListener("loadedmetadata", seekToPreview);
      video.removeEventListener("loadeddata", seekToPreview);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      playsInline
      preload="auto"
      // Do not set crossOrigin — cdn.sanity.io/files omits ACAO and blanks paint.
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
      aria-label={alt}
    />
  );
}
