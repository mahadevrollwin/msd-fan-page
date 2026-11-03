import type { LegalBlock } from "@/data/legal";

type LegalBodyProps = {
  blocks: LegalBlock[];
};

export function LegalBody({ blocks }: LegalBodyProps) {
  return (
    <div className="space-y-8">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h2
              key={`${block.type}-${index}`}
              className="font-display text-4xl tracking-[0.04em] text-cream"
            >
              {block.text}
            </h2>
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
          <p
            key={`${block.type}-${index}`}
            className="font-serif text-lg leading-8 text-mist"
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
