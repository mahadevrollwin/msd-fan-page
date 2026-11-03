import Link from "next/link";
import { BlogCard } from "@/components/blog/BlogCard";
import { categories } from "@/data/categories";
import { listBlogs } from "@/data/blogs";
import { cn } from "@/lib/cn";

type BlogListingProps = {
  category?: string;
  page?: number;
};

function buildHref(next: { category?: string | null; page?: number }) {
  const params = new URLSearchParams();
  if (next.category) params.set("category", next.category);
  if (next.page && next.page > 1) params.set("page", String(next.page));
  const query = params.toString();
  return query ? `/blogs?${query}` : "/blogs";
}

export function BlogListing({ category, page = 1 }: BlogListingProps) {
  const listing = listBlogs({ category, page });

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Blog categories">
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
        </Link>
        {categories.map((item) => {
          const active = listing.category === item.slug;
          return (
            <Link
              key={item.id}
              href={buildHref({ category: item.slug })}
              className={cn(
                "inline-flex min-h-11 items-center border px-4 text-xs uppercase tracking-[0.18em] transition-colors",
                active
                  ? "border-gold bg-gold text-pitch"
                  : "border-white/15 text-mist hover:border-gold hover:text-gold",
              )}
              aria-current={active ? "page" : undefined}
            >
              {item.title}
            </Link>
          );
        })}
      </div>

      {listing.posts.length === 0 ? (
        <p className="border border-dashed border-gold/30 p-8 font-serif text-lg text-mist">
          No essays in this category yet. Choose another filter or check back after CMS publishing.
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {listing.posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {listing.totalPages > 1 ? (
        <nav aria-label="Blog pagination" className="flex flex-wrap items-center justify-between gap-4 border-t border-gold/20 pt-8">
          <p className="text-sm text-muted">
            Page {listing.currentPage} of {listing.totalPages} · {listing.total} essays
          </p>
          <div className="flex gap-2">
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
