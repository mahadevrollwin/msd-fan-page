import { Suspense } from "react";
import { SiteFrame } from "@/components/layout/SiteFrame";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-pitch" />}>
      <SiteFrame>{children}</SiteFrame>
    </Suspense>
  );
}
