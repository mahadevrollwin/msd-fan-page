import type { Metadata, Viewport } from "next";
import { metadata as studioMetadata, viewport as studioViewport } from "next-sanity/studio";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "MSD Archive Studio",
};

export const viewport: Viewport = {
  ...studioViewport,
  themeColor: "#070708",
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-white text-black antialiased">
      {children}
    </div>
  );
}
