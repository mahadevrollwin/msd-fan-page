import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Seam } from "@/components/ui/Seam";
import { legalNav, site } from "@/lib/site";
import type { SiteSettingsView } from "@/sanity/lib/fetch";

function XMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M14.7 10.3 22.2 1.5h-1.8l-6.5 7.6L8.4 1.5H1.8l8 11.4L1.8 22.5h1.8l7-8.2 5.6 8.2h6.6l-8.1-12.2Zm-2.5 2.9-.8-1.2-6.5-9.3h2.8l5.2 7.5.8 1.2 6.8 9.7h-2.8l-5.5-7.9Z" />
    </svg>
  );
}

function YouTubeMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M23 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C19.2 5.4 12 5.4 12 5.4s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6ZM9.8 15.5v-6.6l6.2 3.3-6.2 3.3Z" />
    </svg>
  );
}

function InstagramMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M12 7.4A4.6 4.6 0 1 0 16.6 12 4.6 4.6 0 0 0 12 7.4Zm0 7.6A3 3 0 1 1 15 12a3 3 0 0 1-3 3Zm5.9-8.8a1.1 1.1 0 1 1-1.1-1.1 1.1 1.1 0 0 1 1.1 1.1ZM21.9 7.6a6.3 6.3 0 0 0-1.7-4.5 6.3 6.3 0 0 0-4.5-1.7c-1.8-.1-7-.1-8.8 0A6.4 6.4 0 0 0 2.4 3a6.3 6.3 0 0 0-1.7 4.6c-.1 1.8-.1 7 0 8.8a6.3 6.3 0 0 0 1.7 4.5 6.4 6.4 0 0 0 4.5 1.7c1.8.1 7 .1 8.8 0a6.3 6.3 0 0 0 4.5-1.7 6.3 6.3 0 0 0 1.7-4.5c.1-1.8.1-7 0-8.8Zm-2 10.7a3.6 3.6 0 0 1-2 2c-1.4.6-4.7.4-6.2.4s-4.8.1-6.2-.4a3.6 3.6 0 0 1-2-2c-.6-1.4-.4-4.7-.4-6.2s-.2-4.8.4-6.2a3.6 3.6 0 0 1 2-2c1.4-.6 4.7-.4 6.2-.4s4.8-.2 6.2.4a3.6 3.6 0 0 1 2 2c.6 1.4.4 4.7.4 6.2s.2 4.8-.4 6.2Z" />
    </svg>
  );
}

function SocialGlyph({ label }: { label: string }) {
  if (label === "X") return <XMark />;
  if (label === "YouTube") return <YouTubeMark />;
  if (label === "Instagram") return <InstagramMark />;
  return <BookOpen aria-hidden="true" size={16} />;
}

type FooterProps = {
  settings: SiteSettingsView;
};

export function Footer({ settings }: FooterProps) {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-gold/20 bg-charcoal">
      <Seam className="text-gold/45" />
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 right-0 font-display text-[9rem] leading-none text-gold/[0.07] sm:text-[14rem] lg:right-8"
      >
        {settings.jersey}
      </p>
      <Container className="relative grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.9fr] lg:gap-10">
        <div>
          <p className="font-display text-5xl tracking-[0.12em] text-cream">{settings.name}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.28em] text-gold">{settings.tagline}</p>
          <p className="mt-5 max-w-sm text-sm leading-6 text-mist">{settings.disclaimer}</p>
        </div>
        <nav aria-label="Footer">
          <p className="text-xs uppercase tracking-[0.24em] text-gold">Explore</p>
          <ul className="mt-4 space-y-2">
            {settings.navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-sm text-cream transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Legal">
          <p className="text-xs uppercase tracking-[0.24em] text-gold">Legal</p>
          <ul className="mt-4 space-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-sm text-cream transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Public references">
          <p className="text-xs uppercase tracking-[0.24em] text-gold">Elsewhere</p>
          <ul className="mt-4 space-y-2">
            {settings.socialLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-sm text-cream transition-colors hover:text-gold"
                >
                  <SocialGlyph label={item.label} />
                  <span>{item.label}</span>
                  <span className="sr-only"> ({item.hint}, opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <Container className="relative flex flex-col gap-2 border-t border-white/10 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {site.copyrightYear} {settings.name}. Fan-made and unofficial.
        </p>
        <p>Jersey {settings.jersey} is a fan reference, not an official mark.</p>
      </Container>
    </footer>
  );
}
