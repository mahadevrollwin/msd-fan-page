import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import type { GalleryVideo } from "@/data/types";

type FeaturedVideosProps = {
  videos: GalleryVideo[];
};

export function FeaturedVideos({ videos }: FeaturedVideosProps) {
  if (videos.length === 0) return null;

  return (
    <section className="border-t border-gold/15 bg-charcoal/40 py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              kicker="Featured video"
              title="Press play again"
              summary="You know how they end. That has never stopped anyone."
            />
            <ButtonLink href="/gallery?tab=videos" variant="ghost" className="shrink-0 self-start sm:self-auto">
              Watch videos
            </ButtonLink>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {videos.map((video, index) => (
            <Reveal key={video.id} delay={index * 0.05}>
              <Link href="/gallery?tab=videos" className="group block">
                <div className="relative aspect-video overflow-hidden bg-ink">
                  <Image
                    src={video.thumbnail.src}
                    alt={video.thumbnail.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    {...(video.thumbnail.blurDataURL
                      ? {
                          placeholder: "blur" as const,
                          blurDataURL: video.thumbnail.blurDataURL,
                        }
                      : {})}
                  />
                  <span className="absolute inset-0 bg-pitch/35 transition group-hover:bg-pitch/20" />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid h-14 w-14 place-items-center border border-gold bg-pitch/70 text-gold transition group-hover:bg-gold group-hover:text-pitch">
                      <Play aria-hidden="true" size={22} fill="currentColor" />
                    </span>
                  </span>
                </div>
                <h3 className="mt-4 font-display text-3xl tracking-[0.04em] text-cream group-hover:text-gold">
                  {video.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-mist">{video.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
