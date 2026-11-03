import Link from "next/link";
import { BlogCard } from "@/components/blog/BlogCard";
import type { BlogPost, Category } from "@/data/types";
import { cn } from "@/lib/cn";
import { visiblePageNumbers } from "@/lib/pagination";

type BlogListingProps = {
  categories: Category[];
  listing: {
    posts: BlogPost[];
    total: number;
    totalPages: number;
    currentPage: number;
    category: string | null;
    source: "sanity" | "placeholder";
  };
};

function buildHref(next: { category?: string | null; page?: number }) {
  const params = new URLSearchParams();
  if (next.category) params.set("category", next.category);
  if (next.page && next.page > 1) params.set("page", String(next.page));
  const query = params.toString();
  return query ? `/blogs?${query}` : "/blogs";
}

export function BlogListing({ categories, listing }: BlogListingProps) {
  const pages = visiblePageNumbers(listing.currentPage, listing.totalPages);
  const activeCategory = categories.find((item) => item.slug === listing.category);

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-2" role="list" aria-label="Blog categories">
        <Link
          href={buildHref({ category: null })}
          className={cn(
            "inline-flex min-h-11 items-center border px-4 text-xs uppercase tracking-[0.18em] transition-colors",
            !listing.category
              ? "border-gold bg-gold text-pitch"
              : "border-white/15 text-mist hover:border-gold hover:text-gold",
          )}
          aria-current={!listing.category ? "page" : undefined}
        >
          All
          {!listing.category ? (
            <span className="ml-2 text-[0.65rem] tracking-[0.12em] opacity-80">
              {listing.total}
            </span>
          ) : null}
        </Link>
        {categories.map((item) => {
          const active = listing.category === item.slug;
          return (
            <Link
              key={item.id}
              href={buildHref({ category: item.slug })}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 border px-4 text-xs uppercase tracking-[0.18em] transition-colors",
                active
                  ? "border-gold bg-gold text-pitch"
                  : "border-white/15 text-mist hover:border-gold hover:text-gold",
              )}
              aria-current={active ? "page" : undefined}
            >
              <span>{item.title}</span>
              {typeof item.count === "number" ? (
                <span className="text-[0.65rem] tracking-[0.12em] opacity-80">
                  {item.count}
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>

      {activeCategory ? (
        <p className="text-sm text-muted">
          Showing {activeCategory.title}
          {typeof listing.total === "number" ? ` · ${listing.total} essays` : null}
        </p>
      ) : null}

      {listing.posts.length === 0 ? (
        <p className="border border-dashed border-gold/30 p-8 font-serif text-lg text-mist">
          {listing.category
            ? "No essays in this category yet. Choose another filter or publish more writing in Studio."
            : "No essays published yet. Add blogs in Sanity Studio to fill this archive."}
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {listing.posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {listing.totalPages > 1 ? (
        <nav
          aria-label="Blog pagination"
          className="flex flex-col gap-4 border-t border-gold/20 pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm text-muted">
            Page {listing.currentPage} of {listing.totalPages} · {listing.total} essays
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {listing.currentPage > 1 ? (
              <Link
                href={buildHref({
                  category: listing.category,
                  page: listing.currentPage - 1,
                })}
                className="inline-flex min-h-11 items-center border border-white/15 px-4 text-xs uppercase tracking-[0.18em] text-cream hover:border-gold hover:text-gold"
              >
                Previous
              </Link>
            ) : null}

            {pages.map((page) => {
              const active = page === listing.currentPage;
              return (
                <Link
                  key={page}
                  href={buildHref({
                    category: listing.category,
                    page,
                  })}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex h-11 min-w-11 items-center justify-center border px-3 text-xs uppercase tracking-[0.18em] transition-colors",
                    active
                      ? "border-gold bg-gold text-pitch"
                      : "border-white/15 text-cream hover:border-gold hover:text-gold",
                  )}
                >
                  {page}
                </Link>
              );
            })}

            {listing.currentPage < listing.totalPages ? (
              <Link
                href={buildHref({
                  category: listing.category,
                  page: listing.currentPage + 1,
                })}
                className="inline-flex min-h-11 items-center border border-gold px-4 text-xs uppercase tracking-[0.18em] text-gold hover:bg-gold hover:text-pitch"
              >
                Next
              </Link>
            ) : null}
          </div>
        </nav>
      ) : null}
    </div>
  );
}
