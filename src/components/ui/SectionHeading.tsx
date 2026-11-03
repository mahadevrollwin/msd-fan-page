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
      <p className="text-xs font-medium uppercase tracking-[0.32em] text-gold">{kicker}</p>
      <h2 className="mt-3 font-display text-5xl tracking-[0.04em] text-cream sm:text-6xl lg:text-7xl">
        {title}
      </h2>
      {summary ? (
        <p
          className={cn(
            "mt-4 max-w-2xl font-serif text-lg leading-relaxed text-mist",
            align === "center" && "mx-auto",
          )}
        >
          {summary}
        </p>
      ) : null}
    </div>
  );
}
