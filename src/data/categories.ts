import type { Category } from "@/data/types";

export const categories: Category[] = [
  { id: "cat-moments", title: "Moments", slug: "moments" },
  { id: "cat-captaincy", title: "Captaincy", slug: "captaincy" },
  { id: "cat-legacy", title: "Legacy", slug: "legacy" },
  { id: "cat-match-notes", title: "Match Notes", slug: "match-notes" },
];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}
