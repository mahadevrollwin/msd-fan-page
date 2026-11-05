import { AtmosphereSection } from "@/components/motion/AtmosphereSection";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Seam } from "@/components/ui/Seam";
import type { CareerHighlight } from "@/data/types";

type CareerHighlightsProps = {
  highlights: CareerHighlight[];
};

export function CareerHighlights({ highlights }: CareerHighlightsProps) {
  if (highlights.length === 0) return null;

  return (
    <AtmosphereSection silhouette="left" tone="deep" strength={0.16}>
      <Container>
        <Reveal variant="blurUp">
          <SectionHeading
            kicker="Career highlights"
            title="A short map of the climb"
            summary="Four stops. You already have your own list, and it's probably longer."
          />
        </Reveal>
        <Seam className="mt-10 text-gold/40" />
        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {highlights.map((item, index) => (
            <Reveal key={`${item.year}-${item.title}`} delay={index * 0.07} variant="fadeUp">
              <li className="group relative border-l border-gold/35 pl-5 transition duration-500 hover:border-gold">
                <span
                  aria-hidden
                  className="absolute -left-[3px] top-1 h-1.5 w-1.5 rounded-full bg-gold opacity-70 transition group-hover:opacity-100"
                />
                <p className="font-display text-5xl tracking-[0.08em] text-gold transition duration-500 group-hover:text-gold-bright">
                  {item.year}
                </p>
                <h3 className="mt-4 text-lg font-medium tracking-wide text-cream">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-mist">{item.summary}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </AtmosphereSection>
  );
}
