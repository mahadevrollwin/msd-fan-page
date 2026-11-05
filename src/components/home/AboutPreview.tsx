import Image from "next/image";
import { AtmosphereSection } from "@/components/motion/AtmosphereSection";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import type { HomeContentView } from "@/sanity/lib/fetch";

type AboutPreviewProps = {
  aboutPreview: HomeContentView["aboutPreview"];
};

export function AboutPreview({ aboutPreview }: AboutPreviewProps) {
  return (
    <AtmosphereSection silhouette="right" figure="smile" tone="wash" strength={0.48} mirror={false}>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal variant="fadeRight">
            <div className="relative aspect-[5/4] overflow-hidden bg-ink">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 border border-gold/20"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-8 -left-8 z-0 h-32 w-32 border border-gold/20"
              />
              <Image
                src={aboutPreview.image.src}
                alt={aboutPreview.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-pitch/40 via-transparent to-gold/5" />
            </div>
          </Reveal>
          <Reveal variant="fadeLeft" delay={0.1}>
            <p className="text-xs font-medium uppercase tracking-[0.36em] text-gold">
              {aboutPreview.kicker}
            </p>
            <h2 className="mt-4 font-display text-5xl tracking-[0.04em] text-cream sm:text-6xl lg:text-7xl">
              {aboutPreview.title}
            </h2>
            <div
              aria-hidden
              className="mt-6 h-px w-20 bg-gradient-to-r from-gold to-transparent"
            />
            <p className="mt-6 font-serif text-lg leading-relaxed text-mist sm:text-xl">
              {aboutPreview.summary}
            </p>
            <div className="mt-10">
              <ButtonLink href={aboutPreview.cta.href}>{aboutPreview.cta.label}</ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </AtmosphereSection>
  );
}
