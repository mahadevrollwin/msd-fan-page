"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import type { HomeContentView } from "@/sanity/lib/fetch";

type HeroProps = {
  hero: HomeContentView["hero"];
};

export function Hero({ hero }: HeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <Image
        src={hero.image.src}
        alt={hero.image.alt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-center"
        {...(hero.image.blurDataURL
          ? {
              placeholder: "blur" as const,
              blurDataURL: hero.image.blurDataURL,
            }
          : {})}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-pitch via-pitch/85 to-pitch/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-pitch via-transparent to-pitch/50" />

      <Container className="relative flex min-h-[100svh] flex-col justify-end pb-16 pt-28 sm:pb-20 lg:pb-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-gold">{hero.kicker}</p>
          <p className="mt-5 font-display text-5xl tracking-[0.14em] text-cream sm:text-6xl lg:text-7xl">
            {hero.brand}
          </p>
          <h1 className="mt-3 font-display text-6xl leading-[0.88] tracking-[0.03em] text-gold sm:text-8xl lg:text-[8.5rem]">
            {hero.heading}
          </h1>
          <p className="mt-6 max-w-xl font-serif text-xl leading-relaxed text-cream/90 italic sm:text-2xl">
            {hero.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href={hero.primaryCta.href}>{hero.primaryCta.label}</ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="ghost">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
