import Link from "next/link";

type BrandLockupProps = {
  name: string;
  tagline: string;
  jersey: string;
};

export function BrandLockup({ name, tagline, jersey }: BrandLockupProps) {
  return (
    <Link
      href="/"
      className="group flex min-h-11 items-center gap-3 rounded-sm"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center border border-gold/80 font-display text-[1.65rem] leading-none tracking-wide text-gold transition-colors group-hover:bg-gold group-hover:text-pitch">
        {jersey}
      </span>
      <span className="flex flex-col">
        <span className="font-display text-[1.7rem] leading-none tracking-[0.14em] text-cream sm:text-[1.85rem]">
          {name}
        </span>
        <span className="mt-1 text-[0.65rem] uppercase tracking-[0.24em] text-gold">
          {tagline}
        </span>
      </span>
    </Link>
  );
}
