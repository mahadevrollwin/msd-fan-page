import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { homeContent } from "@/data/home";

export function FeaturedMoments() {
  return (
    <section className="border-t border-gold/15 py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Featured moments"
            title="Nights the stands still recite"
            summary="Editorial placeholders for the career scenes fans return to. Licensed stills and CMS copy replace these soon."
          />
        </Reveal>
        <div className="mt-14 space-y-16 lg:space-y-24">
          {homeContent.moments.map((moment, index) => {
            const reverse = index % 2 === 1;
            return (
              <Reveal key={moment.id} delay={index * 0.05}>
                <article
                  className={`grid items-center gap-8 lg:grid-cols-12 ${
                    reverse ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[16/11] overflow-hidden bg-ink lg:col-span-7">
                    <Image
                      src={moment.image.src}
                      alt={moment.image.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover transition duration-700 hover:scale-[1.03]"
                    />
                  </div>
                  <div className="lg:col-span-5">
                    <p className="text-xs uppercase tracking-[0.28em] text-gold">{moment.year}</p>
                    <h3 className="mt-3 font-display text-4xl tracking-[0.04em] text-cream sm:text-5xl">
                      {moment.title}
                    </h3>
                    <p className="mt-4 font-serif text-lg leading-relaxed text-mist">
                      {moment.summary}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
