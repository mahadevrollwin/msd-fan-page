"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";

export const DHONI_FIGURES = {
  stump: "/silhouettes/dhoni-stump.png",
  celebrate: "/silhouettes/dhoni-celebrate.png",
  smile: "/silhouettes/dhoni-smile.png",
  walk: "/silhouettes/dhoni-walk.png",
  stride: "/silhouettes/dhoni-stride.png",
  jog: "/silhouettes/dhoni-jog.png",
} as const;

export type DhoniFigure = keyof typeof DHONI_FIGURES;

type ParallaxSilhouetteProps = {
  side?: "left" | "right";
  figure?: DhoniFigure;
  className?: string;
  /** Peak opacity while the section is in view (0–1). */
  strength?: number;
  /** Mirror the figure so it faces content. */
  mirror?: boolean;
};

/**
 * Premium photographic MS Dhoni shadow figure that drifts with scroll.
 */
export function ParallaxSilhouette({
  side = "right",
  figure = "stump",
  className,
  strength = 0.28,
  mirror,
}: ParallaxSilhouetteProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [56, -72],
  );
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : side === "right" ? [18, -12] : [-18, 12],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    reduceMotion
      ? [strength, strength, strength, strength]
      : [0.08, strength, strength, 0.1],
  );

  const shouldMirror =
    mirror ??
    // Default: face inward toward section copy
    (side === "left");

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        className,
      )}
    >
      <motion.div
        style={{ y, x, opacity }}
        className={cn(
          "absolute bottom-[-2%] h-[108%] w-[min(62vw,40rem)]",
          side === "right" ? "right-[-10%]" : "left-[-10%]",
        )}
      >
        <Image
          src={DHONI_FIGURES[figure]}
          alt=""
          fill
          sizes="(max-width: 1024px) 62vw, 40rem"
          className={cn(
            "object-contain object-bottom drop-shadow-[0_24px_60px_rgb(0_0_0/0.55)]",
            shouldMirror && "-scale-x-100",
          )}
          priority={false}
        />
        <div
          className={cn(
            "absolute inset-0",
            side === "right"
              ? "bg-gradient-to-l from-transparent via-transparent to-pitch/90"
              : "bg-gradient-to-r from-transparent via-transparent to-pitch/90",
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pitch via-transparent to-pitch/55" />
        <div className="absolute inset-0 bg-gold/10 mix-blend-soft-light" />
      </motion.div>
    </div>
  );
}
