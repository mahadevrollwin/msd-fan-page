import { Suspense } from "react";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { SanityLive } from "@/sanity/lib/live";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-pitch" />}>
      <SiteFrame>{children}</SiteFrame>
      {/* Soft-refresh open tabs when Sanity publishes (data itself is uncached). */}
      <SanityLive />
    </Suspense>
  );
}
