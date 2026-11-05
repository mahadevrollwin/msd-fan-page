"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import type { HomeContentView } from "@/sanity/lib/fetch";

type HeroProps = {
  hero: HomeContentView["hero"];
};

export function Hero({ hero }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 140],
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 56],
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.55],
    reduceMotion ? [1, 1] : [1, 0.35],
  );

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] overflow-hidden">
      <motion.div style={{ y: imageY }} className="absolute inset-x-0 -top-[12%] -bottom-[12%]">
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
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-pitch/75 via-pitch/45 to-pitch/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-pitch via-pitch/20 to-pitch/40" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-pitch to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
      />

      <Container className="relative flex min-h-[100svh] flex-col justify-center py-28 sm:py-32">
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="max-w-4xl"
        >
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="text-xs font-medium uppercase tracking-[0.36em] text-gold"
          >
            {hero.kicker}
          </motion.p>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
            className="mt-5 font-display text-5xl tracking-[0.14em] text-cream sm:text-6xl lg:text-7xl"
          >
            {hero.brand}
          </motion.p>
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 28, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
            className="mt-3 font-display text-6xl leading-[0.88] tracking-[0.03em] text-gold sm:text-8xl lg:text-[8.5rem]"
          >
            {hero.heading}
          </motion.h1>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.34 }}
            className="mt-6 max-w-xl font-serif text-xl leading-relaxed text-cream/90 italic sm:text-2xl"
          >
            {hero.description}
          </motion.p>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.46 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <ButtonLink href={hero.primaryCta.href}>{hero.primaryCta.label}</ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="ghost">
              {hero.secondaryCta.label}
            </ButtonLink>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
