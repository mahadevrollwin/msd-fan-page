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

type ParallaxSilhouetteProps = {
  side?: "left" | "right";
  className?: string;
  /** Peak opacity while the section is in view (0–1). */
  strength?: number;
};

/**
 * Soft MS Dhoni wicketkeeper silhouette that drifts with scroll.
 */
export function ParallaxSilhouette({
  side = "right",
  className,
  strength = 0.22,
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
    reduceMotion ? [0, 0] : [64, -88],
  );
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : side === "right" ? [24, -16] : [-24, 16],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    reduceMotion
      ? [strength, strength, strength, strength]
      : [0.06, strength, strength, 0.08],
  );

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
          "absolute bottom-[-4%] h-[105%] w-[min(58vw,36rem)]",
          side === "right" ? "right-[-12%]" : "left-[-12%]",
        )}
      >
        <Image
          src="/silhouettes/dhoni-shadow.jpg"
          alt=""
          fill
          sizes="(max-width: 1024px) 58vw, 36rem"
          className={cn(
            "object-contain object-bottom mix-blend-multiply",
            // Face inward toward content
            side === "right" ? "scale-x-100" : "-scale-x-100",
          )}
          priority={false}
        />
        <div
          className={cn(
            "absolute inset-0",
            side === "right"
              ? "bg-gradient-to-l from-transparent via-transparent to-pitch"
              : "bg-gradient-to-r from-transparent via-transparent to-pitch",
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pitch via-transparent to-pitch/50" />
        <div className="absolute inset-0 bg-gold/15 mix-blend-overlay" />
      </motion.div>
    </div>
  );
}
