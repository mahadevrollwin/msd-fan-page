import { Container } from "@/components/ui/Container";

type PageFrameProps = {
  kicker: string;
  title: string;
  summary: string;
  children?: React.ReactNode;
};

export function PageFrame({ kicker, title, summary, children }: PageFrameProps) {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <Container className="py-16 sm:py-24 lg:py-28">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-gold">
          {kicker}
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-6xl leading-[0.88] tracking-[0.03em] text-cream sm:text-7xl lg:text-8xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-mist sm:text-xl">
          {summary}
        </p>
        {children ? <div className="mt-10">{children}</div> : null}
      </Container>
    </main>
  );
}
