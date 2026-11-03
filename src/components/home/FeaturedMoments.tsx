import Image from "next/image";
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
    <section className="border-t border-gold/15 py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Featured moments"
            title="Nights the stands still recite"
            summary="Career scenes fans return to — edited from the archive desk."
          />
        </Reveal>
        <div className="mt-14 space-y-16 lg:space-y-24">
          {moments.map((moment, index) => {
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
                      {...(moment.image.blurDataURL
                        ? {
                            placeholder: "blur" as const,
                            blurDataURL: moment.image.blurDataURL,
                          }
                        : {})}
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
