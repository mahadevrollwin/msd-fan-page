export type VideoPlayback =
  | { kind: "file"; src: string }
  | { kind: "youtube"; src: string; embedUrl: string; id: string }
  | { kind: "vimeo"; src: string; embedUrl: string; id: string };

export function youtubeId(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "") || null;
    }
    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.pathname.split("/")[2] || null;
      }
      if (parsed.pathname.startsWith("/shorts/")) {
        return parsed.pathname.split("/")[2] || null;
      }
      return parsed.searchParams.get("v");
    }
  } catch {
    return null;
  }
  return null;
}

function vimeoId(url: string) {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("vimeo.com")) return null;
    const match = parsed.pathname.match(/\/(?:video\/)?(\d+)/);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
  return null;
}

/** Prefer uploaded file; otherwise classify external URL for native or embed playback. */
export function resolveVideoPlayback(input: {
  videoFile?: string;
  videoUrl?: string;
}): VideoPlayback | null {
  if (input.videoFile) {
    return { kind: "file", src: input.videoFile };
  }

  const url = input.videoUrl?.trim();
  if (!url) return null;

  const yt = youtubeId(url);
  if (yt) {
    return {
      kind: "youtube",
      src: url,
      id: yt,
      // mute=0 so user-initiated modal open keeps audio when the host allows it
      embedUrl: `https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&mute=0&rel=0`,
    };
  }

  const vimeo = vimeoId(url);
  if (vimeo) {
    return {
      kind: "vimeo",
      src: url,
      id: vimeo,
      embedUrl: `https://player.vimeo.com/video/${vimeo}?autoplay=1&muted=0`,
    };
  }

  return { kind: "file", src: url };
}

/** True when the CMS did not supply a usable still and we should derive one. */
export function isFallbackVideoThumbnail(src?: string | null) {
  if (!src) return true;
  return src === "/icon.svg" || src.endsWith("/icon.svg");
}

/** Platform poster URL when no Studio thumbnail is set. */
export function resolvePlatformPoster(input: {
  videoFile?: string;
  videoUrl?: string;
}): string | null {
  const playback = resolveVideoPlayback(input);
  if (playback?.kind === "youtube") {
    return `https://i.ytimg.com/vi/${playback.id}/hqdefault.jpg`;
  }
  return null;
}
