import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Seam } from "@/components/ui/Seam";
import { homeContent } from "@/data/home";

export function CareerHighlights() {
  return (
    <section className="border-t border-gold/15 bg-charcoal/50 py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Career highlights"
            title="A short map of the climb"
            summary="Milestone placeholders only. Exact wording and dates will be managed from Sanity."
          />
        </Reveal>
        <Seam className="mt-10 text-gold/40" />
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {homeContent.highlights.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.04}>
              <li className="border-l border-gold/40 pl-5">
                <p className="font-display text-4xl tracking-[0.08em] text-gold">{item.year}</p>
                <h3 className="mt-3 text-lg font-medium text-cream">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-mist">{item.summary}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
