import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "solid",
  className,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-12 items-center justify-center px-6 text-xs font-medium uppercase tracking-[0.22em] transition-colors",
        variant === "solid" && "bg-gold text-pitch hover:bg-gold-bright",
        variant === "ghost" &&
          "border border-gold/70 text-gold hover:bg-gold hover:text-pitch",
        className,
      )}
    >
      {children}
    </Link>
  );
}
