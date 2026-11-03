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
  if (images.length === 0) return null;

  return (
    <section className="border-t border-gold/15 py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              kicker="Featured images"
              title="Stills worth pausing on"
              summary="The light before the first ball, the grass, the stands. Everything around the moment."
            />
            <ButtonLink href="/gallery" variant="ghost" className="shrink-0 self-start sm:self-auto">
              Open gallery
            </ButtonLink>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {images.map((image, index) => (
            <Reveal
              key={image.id}
              delay={index * 0.04}
              className={index === 0 ? "sm:col-span-2 lg:row-span-2" : ""}
            >
              <Link
                href="/gallery"
                className="group relative block aspect-[4/3] overflow-hidden bg-ink lg:aspect-auto lg:h-full"
              >
                <Image
                  src={image.image.src}
                  alt={image.altText}
                  fill
                  sizes={
                    index === 0
                      ? "(max-width: 1024px) 100vw, 50vw"
                      : "(max-width: 1024px) 50vw, 25vw"
                  }
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  {...(image.image.blurDataURL
                    ? {
                        placeholder: "blur" as const,
                        blurDataURL: image.image.blurDataURL,
                      }
                    : {})}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-pitch/80 via-transparent to-transparent opacity-90" />
                <span className="absolute inset-x-0 bottom-0 p-4">
                  <span className="block font-display text-2xl tracking-[0.05em] text-cream">
                    {image.title}
                  </span>
                  <span className="mt-1 block text-sm text-mist">{image.description}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
