import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import type { HomeContentView } from "@/sanity/lib/fetch";

type AboutPreviewProps = {
  aboutPreview: HomeContentView["aboutPreview"];
};

export function AboutPreview({ aboutPreview }: AboutPreviewProps) {
  return (
    <section className="border-t border-gold/15 py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="relative aspect-[5/4] overflow-hidden bg-ink">
              <Image
                src={aboutPreview.image.src}
                alt={aboutPreview.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.32em] text-gold">
                {aboutPreview.kicker}
              </p>
              <h2 className="mt-3 font-display text-5xl tracking-[0.04em] text-cream sm:text-6xl">
                {aboutPreview.title}
              </h2>
              <p className="mt-5 font-serif text-lg leading-relaxed text-mist">
                {aboutPreview.summary}
              </p>
              <div className="mt-8">
                <ButtonLink href={aboutPreview.cta.href}>{aboutPreview.cta.label}</ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
