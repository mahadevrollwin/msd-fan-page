import { ParallaxSilhouette } from "@/components/motion/ParallaxSilhouette";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

type PageFrameProps = {
  kicker: string;
  title: string;
  summary: string;
  children?: React.ReactNode;
  silhouette?: "left" | "right" | "none";
  className?: string;
};

export function PageFrame({
  kicker,
  title,
  summary,
  children,
  silhouette = "none",
  className,
}: PageFrameProps) {
  return (
    <main id="main" className={cn("relative flex flex-1 flex-col overflow-hidden", className)}>
      {silhouette !== "none" ? (
        <ParallaxSilhouette side={silhouette} strength={0.16} className="top-0 h-[70vh]" />
      ) : null}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[42vh] bg-[radial-gradient(720px_320px_at_18%_0%,rgb(228_180_35/0.1),transparent_60%)]"
      />
      <Container className="relative z-10 py-16 sm:py-24 lg:py-28">
        <Reveal variant="blurUp">
          <div className="mb-4 flex items-center gap-3">
            <span
              aria-hidden
              className="h-px w-10 bg-gradient-to-r from-gold to-transparent"
            />
            <p className="text-xs font-medium uppercase tracking-[0.36em] text-gold">
              {kicker}
            </p>
          </div>
          <h1 className="max-w-4xl font-display text-6xl leading-[0.88] tracking-[0.03em] text-cream sm:text-7xl lg:text-8xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-mist sm:text-xl">
            {summary}
          </p>
        </Reveal>
        {children ? <div className="mt-12 sm:mt-14">{children}</div> : null}
      </Container>
    </main>
  );
}
