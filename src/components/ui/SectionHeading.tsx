import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  kicker: string;
  title: string;
  summary?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  kicker,
  title,
  summary,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <div
        className={cn(
          "mb-4 flex items-center gap-3",
          align === "center" && "justify-center",
        )}
      >
        <span
          aria-hidden
          className="h-px w-8 bg-gradient-to-r from-gold to-transparent sm:w-12"
        />
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.36em] text-gold">
          {kicker}
        </p>
      </div>
      <h2 className="font-display text-5xl tracking-[0.04em] text-cream sm:text-6xl lg:text-7xl">
        {title}
      </h2>
      {summary ? (
        <p
          className={cn(
            "mt-5 max-w-2xl font-serif text-lg leading-relaxed text-mist/95 sm:text-xl",
            align === "center" && "mx-auto",
          )}
        >
          {summary}
        </p>
      ) : null}
    </div>
  );
}
