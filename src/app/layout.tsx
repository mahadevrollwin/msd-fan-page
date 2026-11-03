import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Newsreader, Outfit } from "next/font/google";
import { absoluteUrl, getSiteUrl } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${site.name} | Unofficial MS Dhoni Fan Page`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "MS Dhoni",
    "MSD Archive",
    "unofficial fan page",
    "cricket",
    "CSK",
    "India cricket",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: "sports",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: absoluteUrl("/"),
    siteName: site.name,
    title: `${site.name} | Unofficial MS Dhoni Fan Page`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Unofficial MS Dhoni Fan Page`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#070708",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${bebas.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="flex min-h-svh flex-col">{children}</body>
    </html>
  );
}
