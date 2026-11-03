import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { exploreNav, site } from "@/lib/site";

export default function HomePage() {
  return (
    <main id="main" className="relative flex flex-1 flex-col overflow-hidden">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 top-2 font-display text-[11rem] leading-none text-gold/[0.08] sm:text-[16rem] lg:right-8 lg:text-[22rem]"
      >
        {site.jersey}
      </p>
      <Container className="relative flex flex-1 flex-col justify-between py-14 sm:py-20 lg:py-24">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-gold">
            Unofficial fan archive
          </p>
          <h1 className="mt-5 max-w-5xl font-display text-6xl leading-[0.84] tracking-[0.03em] text-cream sm:text-8xl lg:text-[8.5rem]">
            MS Dhoni,
            <span className="block text-gold">from the stands.</span>
          </h1>
          <p className="mt-8 max-w-xl font-serif text-xl leading-relaxed text-mist italic sm:text-2xl">
            A fan-made record of the career — stories, pictures, and the long
            memory of a captain. This is not an official website.
          </p>
        </div>
        <div className="mt-16">
          <nav aria-label="Archive sections" className="grid gap-4 border-t border-gold/25 pt-6 sm:grid-cols-3">
            {exploreNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex min-h-28 flex-col justify-between border border-white/10 bg-charcoal/70 p-5 transition-colors hover:border-gold/70 hover:bg-ink"
              >
                <span className="font-display text-4xl tracking-[0.06em] text-cream transition-colors group-hover:text-gold">
                  {item.label}
                </span>
                <span className="text-sm text-mist">{item.note}</span>
              </Link>
            ))}
          </nav>
          <p className="mt-6 max-w-3xl text-sm leading-6 text-muted">{site.disclaimer}</p>
        </div>
      </Container>
    </main>
  );
}
