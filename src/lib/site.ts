/**
 * Fallback layout navigation and fan-page identity.
 * Prefer Sanity `siteSettings` via `getSiteSettings()` when published.
 */

export const site = {
  name: "MSD Archive",
  jersey: "07",
  tagline: "Unofficial fan page",
  description:
    "An unofficial fan archive of MS Dhoni's cricket career — stories, pictures, and the long memory of a captain. Not affiliated with MS Dhoni or any cricket board.",
  disclaimer:
    "This is an unofficial fan page. It is not affiliated with, endorsed by, or connected to MS Dhoni, his representatives, Chennai Super Kings, the BCCI, or any other cricket body.",
  copyrightYear: 2026,
} as const;

export type SiteHref =
  | "/"
  | "/blogs"
  | "/gallery"
  | "/about"
  | "/terms-and-conditions"
  | "/privacy-policy";

export type NavItem = {
  label: string;
  href: SiteHref;
  note: string;
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/", note: "The archive entrance" },
  { label: "Blogs", href: "/blogs", note: "Essays and match notes" },
  { label: "Gallery", href: "/gallery", note: "Images and video" },
  { label: "About", href: "/about", note: "The fan page and the journey" },
];

export const legalNav: NavItem[] = [
  {
    label: "Terms & Conditions",
    href: "/terms-and-conditions",
    note: "How this fan page is used",
  },
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
    note: "What this site remembers",
  },
];

export const exploreNav = primaryNav.filter((item) => item.href !== "/");

export type SocialLink = {
  label: string;
  href: string;
  hint: string;
};

export const socialLinks: SocialLink[] = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/results?search_query=MS+Dhoni",
    hint: "Public videos of MS Dhoni",
  },
  {
    label: "Wikipedia",
    href: "https://en.wikipedia.org/wiki/MS_Dhoni",
    hint: "Public biography of MS Dhoni",
  },
  {
    label: "X",
    href: "https://x.com/search?q=MS%20Dhoni&src=typed_query",
    hint: "Public conversation about MS Dhoni",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/explore/tags/msdhoni/",
    hint: "Public posts tagged msdhoni",
  },
];
