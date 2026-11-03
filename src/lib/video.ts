export type VideoPlayback =
  | { kind: "file"; src: string }
  | { kind: "youtube"; src: string; embedUrl: string }
  | { kind: "vimeo"; src: string; embedUrl: string };

function youtubeId(url: string) {
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
      embedUrl: `https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0`,
    };
  }

  const vimeo = vimeoId(url);
  if (vimeo) {
    return {
      kind: "vimeo",
      src: url,
      embedUrl: `https://player.vimeo.com/video/${vimeo}?autoplay=1`,
    };
  }

  return { kind: "file", src: url };
}
