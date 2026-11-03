import { Suspense } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header, HeaderFallback } from "@/components/layout/Header";
import { getSiteSettings } from "@/sanity/lib/fetch";

export async function SiteFrame({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Suspense
        fallback={
          <HeaderFallback
            name={settings.name}
            tagline={settings.tagline}
            jersey={settings.jersey}
          />
        }
      >
        <Header settings={settings} />
      </Suspense>
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer settings={settings} />
    </>
  );
}
