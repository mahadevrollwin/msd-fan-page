import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "@portabletext/react";
import Image from "next/image";
import { resolveImage } from "@/sanity/lib/image";

type PortableTextBodyProps = {
  value: unknown[] | null | undefined;
  className?: string;
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-serif text-lg leading-8 text-mist">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-4xl tracking-[0.04em] text-cream sm:text-5xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-3xl tracking-[0.04em] text-cream">
        {children}
      </h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-5 font-serif text-lg leading-8 text-mist marker:text-gold">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-5 font-serif text-lg leading-8 text-mist marker:text-gold">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-cream">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-cream/95">{children}</em>,
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const blank = Boolean(value?.blank);
      return (
        <a
          href={href}
          className="text-gold underline-offset-4 transition-colors hover:underline"
          {...(blank
            ? { target: "_blank", rel: "noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const image = resolveImage(
        value,
        typeof value?.alt === "string" ? value.alt : "Essay image",
        1200,
      );
      if (!image) return null;
      return (
        <figure className="space-y-3">
          <div className="relative aspect-[16/10] overflow-hidden bg-ink">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
            />
          </div>
          {typeof value?.caption === "string" && value.caption ? (
            <figcaption className="text-sm text-muted">{value.caption}</figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

export function PortableTextBody({ value, className }: PortableTextBodyProps) {
  if (!value?.length) return null;

  return (
    <div className={className ?? "space-y-6"}>
      <PortableText
        value={value as PortableTextBlock[]}
        components={components}
      />
    </div>
  );
}
