"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";

type RevealVariant = "fadeUp" | "fadeLeft" | "fadeRight" | "scaleIn" | "blurUp";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  once?: boolean;
};

const variants: Record<RevealVariant, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1 },
  },
  blurUp: {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
};

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "fadeUp",
  once = true,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      variants={variants[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.22, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
