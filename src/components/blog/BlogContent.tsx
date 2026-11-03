import Image from "next/image";
import type { BlogBlock } from "@/data/types";

type BlogContentProps = {
  blocks: BlogBlock[];
};

export function BlogContent({ blocks }: BlogContentProps) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const Tag = block.level === 2 ? "h2" : "h3";
          return (
            <Tag
              key={`${block.type}-${index}`}
              className={
                block.level === 2
                  ? "font-display text-4xl tracking-[0.04em] text-cream sm:text-5xl"
                  : "font-display text-3xl tracking-[0.04em] text-cream"
              }
            >
              {block.text}
            </Tag>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p
              key={`${block.type}-${index}`}
              className="font-serif text-lg leading-8 text-mist"
            >
              {block.text}
            </p>
          );
        }

        if (block.type === "list") {
          return (
            <ul
              key={`${block.type}-${index}`}
              className="list-disc space-y-2 pl-5 font-serif text-lg leading-8 text-mist marker:text-gold"
            >
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        return (
          <figure key={`${block.type}-${index}`} className="space-y-3">
            <div className="relative aspect-[16/10] overflow-hidden bg-ink">
              <Image
                src={block.src}
                alt={block.alt}
                fill
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-cover"
              />
            </div>
            {block.caption ? (
              <figcaption className="text-sm text-muted">{block.caption}</figcaption>
            ) : null}
          </figure>
        );
      })}
    </div>
  );
}
