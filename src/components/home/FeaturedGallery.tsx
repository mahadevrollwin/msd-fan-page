import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
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
    <section className="border-t border-gold/15 py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              kicker="Featured image"
              title="Stills worth pausing on"
              summary="The light before the first ball, the grass, the stands. Everything around the moment."
            />
            <ButtonLink href="/gallery" variant="ghost" className="shrink-0 self-start sm:self-auto">
              Open gallery
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="mt-12">
          <Link
            href="/gallery"
            className="group relative block w-full overflow-hidden bg-ink"
          >
            {/* Intrinsic height — object-contain so the full still shows, no crop */}
            <Image
              src={image.image.src}
              alt={image.altText || image.title}
              width={1920}
              height={1080}
              sizes="100vw"
              className="h-auto w-full object-contain transition duration-700 group-hover:opacity-95"
              style={{ width: "100%", height: "auto" }}
              {...(image.image.blurDataURL
                ? {
                    placeholder: "blur" as const,
                    blurDataURL: image.image.blurDataURL,
                  }
                : {})}
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pitch/90 via-pitch/20 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8 lg:p-10">
              <span>
                {image.category ? (
                  <span className="block text-[0.7rem] uppercase tracking-[0.2em] text-gold">
                    {image.category}
                  </span>
                ) : null}
                <span className="mt-2 block font-display text-4xl tracking-[0.04em] text-cream sm:text-5xl lg:text-6xl">
                  {image.title}
                </span>
                {image.description ? (
                  <span className="mt-3 block max-w-xl font-serif text-base leading-relaxed text-cream/85 italic sm:text-lg">
                    {image.description}
                  </span>
                ) : null}
              </span>
              <span className="mt-4 inline-flex min-h-11 items-center border border-gold/60 bg-pitch/40 px-5 text-xs uppercase tracking-[0.2em] text-gold transition group-hover:border-gold group-hover:bg-gold group-hover:text-pitch sm:mt-0">
                View gallery
              </span>
            </span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
