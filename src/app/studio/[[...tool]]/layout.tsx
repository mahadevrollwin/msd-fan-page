import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "MSD Archive Studio",
  referrer: "same-origin",
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#070708",
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-white text-black antialiased">
      {children}
    </div>
  );
}
