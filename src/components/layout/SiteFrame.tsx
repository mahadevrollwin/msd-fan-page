import { Suspense } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header, HeaderFallback } from "@/components/layout/Header";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Suspense fallback={<HeaderFallback />}>
        <Header />
      </Suspense>
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer />
    </>
  );
}
