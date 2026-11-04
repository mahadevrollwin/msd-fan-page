"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
 * Prefers a Studio still; otherwise YouTube poster or a frame pulled from the
 * uploaded / direct file URL so gallery cards never show the generic icon.
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
  const [frame, setFrame] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    const capture = () => {
      if (cancelled || !video.videoWidth) return;
      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(video, 0, 0);
        const data = canvas.toDataURL("image/jpeg", 0.82);
        if (!cancelled) setFrame(data);
      } catch {
        // Cross-origin videos may taint the canvas; keep the live <video> frame.
      }
    };

    const seekToFrame = () => {
      const target = Number.isFinite(video.duration) && video.duration > 0
        ? Math.min(1, video.duration * 0.08)
        : 0.25;
      try {
        video.currentTime = target;
      } catch {
        capture();
      }
    };

    const onLoaded = () => seekToFrame();
    video.addEventListener("loadeddata", onLoaded);
    video.addEventListener("seeked", capture);

    if (video.readyState >= 2) seekToFrame();

    return () => {
      cancelled = true;
      video.removeEventListener("loadeddata", onLoaded);
      video.removeEventListener("seeked", capture);
    };
  }, [src]);

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          frame ? "opacity-0" : "opacity-100",
          className,
        )}
        aria-hidden={Boolean(frame)}
      />
      {frame ? (
        // eslint-disable-next-line @next/next/no-img-element -- data-URL frame from canvas
        <img
          src={frame}
          alt={alt}
          className={cn("absolute inset-0 h-full w-full object-cover", className)}
        />
      ) : null}
    </>
  );
}
