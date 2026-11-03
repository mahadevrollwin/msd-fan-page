export type LegalBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type LegalPageContent = {
  slug: "terms-and-conditions" | "privacy-policy";
  title: string;
  summary: string;
  updatedAt: string;
  blocks: LegalBlock[];
};

export const termsContent: LegalPageContent = {
  slug: "terms-and-conditions",
  title: "Terms & Conditions",
  summary:
    "Placeholder legal copy for how this unofficial fan page may be used. Sanity will own the published text.",
  updatedAt: "2026-11-03",
  blocks: [
    {
      type: "heading",
      text: "Unofficial status",
    },
    {
      type: "paragraph",
      text: "MSD Archive is a fan-made website. It is not affiliated with, endorsed by, or connected to MS Dhoni, his representatives, Chennai Super Kings, the BCCI, or any other cricket organisation.",
    },
    {
      type: "heading",
      text: "Acceptable use",
    },
    {
      type: "list",
      items: [
        "Use the site for personal, non-commercial reading and viewing",
        "Do not scrape or republish content in a way that implies official endorsement",
        "Do not attempt to disrupt the site or its hosting",
      ],
    },
    {
      type: "heading",
      text: "Content and accuracy",
    },
    {
      type: "paragraph",
      text: "Articles and media may contain fan commentary. Historical claims should be verified against primary sources. This Phase 2 text is temporary and will be replaced by Sanity legal fields.",
    },
    {
      type: "heading",
      text: "Intellectual property",
    },
    {
      type: "paragraph",
      text: "Site design and original writing belong to the fan-page operators where applicable. Third-party images and video remain under their own licences. Atmosphere photos currently come from Unsplash for layout only.",
    },
  ],
};

export const privacyContent: LegalPageContent = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  summary:
    "Placeholder policy for what this unofficial fan page may collect. The published policy will be edited in Sanity.",
  updatedAt: "2026-11-03",
  blocks: [
    {
      type: "heading",
      text: "What this policy covers",
    },
    {
      type: "paragraph",
      text: "This privacy policy describes how MSD Archive may handle information when you visit the website. It is fan-page documentation, not legal advice.",
    },
    {
      type: "heading",
      text: "Information we may process",
    },
    {
      type: "list",
      items: [
        "Basic server and hosting logs from Vercel",
        "Optional analytics if enabled later",
        "Content requests needed to render pages and media",
      ],
    },
    {
      type: "heading",
      text: "Cookies and similar tech",
    },
    {
      type: "paragraph",
      text: "The site may use essential cookies required for hosting and security. Any future analytics cookies will be described here after they are added.",
    },
    {
      type: "heading",
      text: "Third parties",
    },
    {
      type: "paragraph",
      text: "Hosting may involve Vercel. Media may involve Sanity or licensed CDNs. External social links leave this site when you choose to open them.",
    },
    {
      type: "heading",
      text: "Contact",
    },
    {
      type: "paragraph",
      text: "Privacy questions for this fan page will be answered through a contact method published in Sanity site settings.",
    },
  ],
};
