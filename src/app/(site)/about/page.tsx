import type { Metadata } from "next";
import Image from "next/image";
import { PageFrame } from "@/components/layout/PageFrame";
import { PortableTextBody } from "@/components/portable-text/PortableTextBody";
import { Reveal } from "@/components/ui/Reveal";
import { Seam } from "@/components/ui/Seam";
import { buildPageMetadata } from "@/lib/seo";
import { getAboutContent } from "@/sanity/lib/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getAboutContent();
  return buildPageMetadata({
    title: content.hero.title || "About",
    description: content.hero.summary,
    path: "/about",
    image: content.fanPage.image,
  });
}

export default async function AboutPage() {
  const { hero, fanPage, journey, milestones, legacy } = await getAboutContent();

  return (
    <PageFrame kicker={hero.kicker} title={hero.title} summary={hero.summary}>
      <div className="space-y-20">
        <Reveal>
          <section
            className="grid items-center gap-10 lg:grid-cols-2"
            aria-labelledby="about-fan-page-heading"
          >
            <div className="relative aspect-[5/4] overflow-hidden bg-ink">
              <Image
                src={fanPage.image.src}
                alt={fanPage.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2
                id="about-fan-page-heading"
                className="font-display text-5xl tracking-[0.04em] text-cream"
              >
                {fanPage.title}
              </h2>
              <div className="mt-5">
                {fanPage.portableText?.length ? (
                  <PortableTextBody value={fanPage.portableText} />
                ) : (
                  <div className="space-y-4">
                    {fanPage.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="font-serif text-lg leading-8 text-mist"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section aria-labelledby="about-journey-heading">
            <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h2
                  id="about-journey-heading"
                  className="font-display text-5xl tracking-[0.04em] text-cream"
                >
                  {journey.title}
                </h2>
                <p className="mt-4 font-serif text-lg leading-8 text-mist">
                  {journey.summary}
                </p>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                <Image
                  src={journey.image.src}
                  alt={journey.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {journey.beats.map((beat) => (
                <div key={beat.title} className="border-t border-gold/30 pt-5">
                  <h3 className="font-display text-3xl tracking-[0.05em] text-gold">
                    {beat.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-mist">{beat.text}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section aria-labelledby="about-milestones-heading">
            <h2
              id="about-milestones-heading"
              className="font-display text-5xl tracking-[0.04em] text-cream"
            >
              Career milestones
            </h2>
            <Seam className="mt-6 text-gold/40" />
            <ol className="mt-8 grid gap-8 sm:grid-cols-2">
              {milestones.map((item) => (
                <li key={`${item.year}-${item.title}`} className="border-l border-gold/40 pl-5">
                  <p className="font-display text-4xl tracking-[0.06em] text-gold">
                    {item.year}
                  </p>
                  <h3 className="mt-2 text-lg text-cream">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-mist">{item.summary}</p>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>

        <Reveal>
          <section
            className="grid items-center gap-10 lg:grid-cols-2"
            aria-labelledby="about-legacy-heading"
          >
            <div>
              <h2
                id="about-legacy-heading"
                className="font-display text-5xl tracking-[0.04em] text-cream"
              >
                {legacy.title}
              </h2>
              <p className="mt-4 font-serif text-lg leading-8 text-mist">
                {legacy.summary}
              </p>
              <ul className="mt-6 list-disc space-y-2 pl-5 text-mist marker:text-gold">
                {legacy.points.map((point) => (
                  <li key={point} className="leading-7">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[5/4] overflow-hidden bg-ink">
              <Image
                src={legacy.image.src}
                alt={legacy.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </section>
        </Reveal>
      </div>
    </PageFrame>
  );
}
