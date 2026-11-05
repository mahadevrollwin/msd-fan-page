import Image from "next/image";
import Link from "next/link";
import { AtmosphereSection } from "@/components/motion/AtmosphereSection";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import type { GalleryImage } from "@/data/types";

type FeaturedGalleryProps = {
  images: GalleryImage[];
};

export function FeaturedGallery({ images }: FeaturedGalleryProps) {
  const image = images[0];
  if (!image) return null;

  return (
    <AtmosphereSection silhouette="right" figure="walk" tone="wash" strength={0.48} mirror={false}>
      <Container>
        <Reveal variant="blurUp">
          <SectionHeading
            kicker="Featured image"
            title="Stills worth pausing on"
            summary="The light before the first ball, the grass, the stands. Everything around the moment."
          />
        </Reveal>

        <Reveal delay={0.1} variant="scaleIn" className="mt-14">
          <div className="mx-auto w-full max-w-2xl sm:max-w-3xl">
            <Link
              href="/gallery"
              className="group relative block w-full overflow-hidden bg-ink"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-20 border border-gold/25 transition group-hover:border-gold/50"
              />
              <Image
                src={image.image.src}
                alt={image.altText || image.title}
                width={1200}
                height={750}
                sizes="(max-width: 768px) 100vw, 48rem"
                className="h-auto w-full object-contain transition duration-700 group-hover:scale-[1.02] group-hover:opacity-95"
                style={{ width: "100%", height: "auto" }}
                {...(image.image.blurDataURL
                  ? {
                      placeholder: "blur" as const,
                      blurDataURL: image.image.blurDataURL,
                    }
                  : {})}
              />
              <span className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-pitch/95 via-pitch/25 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-2 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7">
                <span>
                  {image.category ? (
                    <span className="block text-[0.7rem] uppercase tracking-[0.2em] text-gold">
                      {image.category}
                    </span>
                  ) : null}
                  <span className="mt-2 block font-display text-3xl tracking-[0.04em] text-cream sm:text-4xl lg:text-5xl">
                    {image.title}
                  </span>
                  {image.description ? (
                    <span className="mt-2 block max-w-xl font-serif text-sm leading-relaxed text-cream/85 italic sm:text-base">
                      {image.description}
                    </span>
                  ) : null}
                </span>
                <span className="mt-3 inline-flex min-h-11 items-center border border-gold/60 bg-pitch/40 px-5 text-xs uppercase tracking-[0.2em] text-gold transition group-hover:border-gold group-hover:bg-gold group-hover:text-pitch sm:mt-0">
                  View gallery
                </span>
              </span>
            </Link>
          </div>
        </Reveal>
      </Container>
    </AtmosphereSection>
  );
}
