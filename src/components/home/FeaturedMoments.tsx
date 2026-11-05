import Image from "next/image";
import { AtmosphereSection } from "@/components/motion/AtmosphereSection";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import type { FeaturedMoment } from "@/data/types";

type FeaturedMomentsProps = {
  moments: FeaturedMoment[];
};

export function FeaturedMoments({ moments }: FeaturedMomentsProps) {
  if (moments.length === 0) return null;

  return (
    <AtmosphereSection silhouette="right" figure="stump" tone="wash" strength={0.3} mirror={false}>
      <Container>
        <Reveal variant="blurUp">
          <SectionHeading
            kicker="Featured moments"
            title="Nights the stands still recite"
            summary="Ask anyone where they were. They'll tell you, and then they'll tell you the score."
          />
        </Reveal>
        <div className="mt-16 space-y-20 lg:space-y-28">
          {moments.map((moment, index) => {
            const reverse = index % 2 === 1;
            return (
              <article
                key={moment.id}
                className={`grid items-center gap-10 lg:grid-cols-12 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal
                  variant={reverse ? "fadeLeft" : "fadeRight"}
                  delay={0.04}
                  className="relative lg:col-span-7"
                >
                  <div className="relative aspect-[16/11] overflow-hidden bg-ink">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -inset-px z-10 border border-gold/20"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute left-3 top-3 z-10 h-8 w-8 border-l border-t border-gold/50"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute bottom-3 right-3 z-10 h-8 w-8 border-b border-r border-gold/50"
                    />
                    <Image
                      src={moment.image.src}
                      alt={moment.image.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover transition duration-700 hover:scale-[1.04]"
                      {...(moment.image.blurDataURL
                        ? {
                            placeholder: "blur" as const,
                            blurDataURL: moment.image.blurDataURL,
                          }
                        : {})}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-pitch/35 via-transparent to-gold/5" />
                  </div>
                </Reveal>
                <Reveal
                  variant={reverse ? "fadeRight" : "fadeLeft"}
                  delay={0.12}
                  className="lg:col-span-5"
                >
                  <p className="text-xs uppercase tracking-[0.32em] text-gold">
                    {moment.year}
                  </p>
                  <h3 className="mt-4 font-display text-4xl tracking-[0.04em] text-cream sm:text-5xl lg:text-6xl">
                    {moment.title}
                  </h3>
                  <div
                    aria-hidden
                    className="mt-5 h-px w-16 bg-gradient-to-r from-gold to-transparent"
                  />
                  <p className="mt-5 font-serif text-lg leading-relaxed text-mist sm:text-xl">
                    {moment.summary}
                  </p>
                </Reveal>
              </article>
            );
          })}
        </div>
      </Container>
    </AtmosphereSection>
  );
}
