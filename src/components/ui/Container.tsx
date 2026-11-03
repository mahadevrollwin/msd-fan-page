import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "nav" | "section";
};

export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10", className)}>
      {children}
    </Tag>
  );
}
