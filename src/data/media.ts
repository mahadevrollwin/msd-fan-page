/**
 * Atmosphere photography from Unsplash (Unsplash License).
 * These are stadium and cricket textures for Phase 2 layout work —
 * not portraits of MS Dhoni. Sanity media replaces them later.
 */

const u = (id: string, opts = "auto=format&fit=crop&w=1600&q=80") =>
  `https://images.unsplash.com/${id}?${opts}`;

export const media = {
  hero: {
    src: u("photo-1540747913346-19e32dc3e97e", "auto=format&fit=crop&w=2400&q=80"),
    alt: "Floodlit cricket stadium at night, Unsplash atmosphere photo",
  },
  pitchClose: {
    src: u("photo-1531415074968-036ba1b575da"),
    alt: "Cricket bat and ball on grass, Unsplash atmosphere photo",
  },
  crowd: {
    src: u("photo-1624526267942-ab0ff8dd0e1e"),
    alt: "Cricket stadium crowd under lights, Unsplash atmosphere photo",
  },
  stands: {
    src: u("photo-1594470117722-de4b9a02ebed"),
    alt: "Empty stadium seats before a match, Unsplash atmosphere photo",
  },
  field: {
    src: u("photo-1593766787980-5e45d85d3c8b"),
    alt: "Green cricket field from the boundary, Unsplash atmosphere photo",
  },
  dusk: {
    src: u("photo-1578662996442-48f60103fc96"),
    alt: "Sports arena lights at dusk, Unsplash atmosphere photo",
  },
  practice: {
    src: u("photo-1587280501635-68a0e82cd5d6"),
    alt: "Cricket practice nets and gear, Unsplash atmosphere photo",
  },
  celebration: {
    src: u("photo-1461896836934-ffe607ba6851"),
    alt: "Athletes celebrating on a field, Unsplash atmosphere photo",
  },
  locker: {
    src: u("photo-1517649763962-0c623066027e"),
    alt: "Sports equipment in soft light, Unsplash atmosphere photo",
  },
  nightBowl: {
    src: u("photo-1529900748604-07564a03e7a6"),
    alt: "Night sports field under floodlights, Unsplash atmosphere photo",
  },
  scoreboard: {
    src: u("photo-1504450758481-7338eba7524a"),
    alt: "Basketball arena scoreboard lights as a stand-in for match night, Unsplash",
  },
  rain: {
    src: u("photo-1461896836934-ffe607ba6851", "auto=format&fit=crop&w=1200&q=75&sat=-20"),
    alt: "Field celebration under stadium lights, Unsplash atmosphere photo",
  },
} as const;

/** Open-source sample clip used as a stand-in for an uploaded CMS video file. */
export const sampleVideoFile =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

/**
 * Public Wikimedia Commons cricket highlight (CC BY-SA 3.0).
 * Used as the external URL example until Sanity videos are connected.
 */
export const sampleExternalVideo =
  "https://upload.wikimedia.org/wikipedia/commons/transcoded/8/87/Cricket_Bowling_Action.webm/Cricket_Bowling_Action.webm.480p.vp9.webm";
