import {
  ParallaxSilhouette,
  type DhoniFigure,
} from "@/components/motion/ParallaxSilhouette";
import { cn } from "@/lib/cn";

type AtmosphereSectionProps = {
  children: React.ReactNode;
  className?: string;
  silhouette?: "left" | "right" | "none";
  figure?: DhoniFigure;
  tone?: "default" | "deep" | "wash";
  strength?: number;
  mirror?: boolean;
};

/**
 * Premium section shell: soft gold wash + optional parallax figure.
 */
export function AtmosphereSection({
  children,
  className,
  silhouette = "none",
  figure = "stump",
  tone = "default",
  strength = 0.46,
  mirror,
}: AtmosphereSectionProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden border-t border-gold/12 py-24 sm:py-32",
        tone === "deep" && "bg-charcoal/55",
        tone === "wash" &&
          "bg-[radial-gradient(900px_420px_at_12%_0%,rgb(228_180_35/0.08),transparent_55%)]",
        className,
      )}
    >
      {silhouette !== "none" ? (
        <ParallaxSilhouette
          side={silhouette}
          figure={figure}
          strength={strength}
          mirror={mirror}
        />
      ) : null}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgb(7_7_8/0.35)_100%)]"
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent",
        )}
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
