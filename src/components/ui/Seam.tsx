import { cn } from "@/lib/cn";

type SeamProps = {
  className?: string;
};

export function Seam({ className }: SeamProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 28"
      preserveAspectRatio="none"
      className={cn("h-3 w-full text-gold/50", className)}
    >
      <path
        d="M0 16 C 180 4, 360 26, 600 14 S 980 4, 1200 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="7 9"
        vectorEffect="non-scaling-stroke"
      />
      <g fill="currentColor">
        <circle cx="150" cy="12" r="1.4" />
        <circle cx="300" cy="18" r="1.4" />
        <circle cx="450" cy="11" r="1.4" />
        <circle cx="600" cy="14" r="1.4" />
        <circle cx="750" cy="18" r="1.4" />
        <circle cx="900" cy="10" r="1.4" />
        <circle cx="1050" cy="16" r="1.4" />
      </g>
    </svg>
  );
}
