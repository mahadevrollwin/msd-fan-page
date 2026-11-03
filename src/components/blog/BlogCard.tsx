import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/data/types";
import { formatDate } from "@/lib/format";

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group flex h-full flex-col">
      <Link href={`/blogs/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-ink">
        <Image
          src={post.featuredImage.src}
          alt={post.featuredImage.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-pitch/70 via-transparent to-transparent" />
      </Link>
      <div className="flex flex-1 flex-col border border-t-0 border-white/10 bg-charcoal/40 p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] uppercase tracking-[0.18em] text-gold">
          <span>{post.category.title}</span>
          <span className="text-muted">/</span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </div>
        <h3 className="mt-3 font-display text-3xl tracking-[0.04em] text-cream transition-colors group-hover:text-gold">
          <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-mist">{post.excerpt}</p>
        <Link
          href={`/blogs/${post.slug}`}
          className="mt-5 inline-flex min-h-11 items-center text-xs uppercase tracking-[0.2em] text-gold"
        >
          Read essay
        </Link>
      </div>
    </article>
  );
}
