import { BlogCard } from "@/components/blog/BlogCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import type { BlogPost } from "@/data/types";

type LatestBlogsProps = {
  posts: BlogPost[];
};

export function LatestBlogs({ posts }: LatestBlogsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-gold/15 py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              kicker="Latest writing"
              title="Fresh from the archive desk"
              summary="Newest essays first — pulled from the CMS when published."
            />
            <ButtonLink href="/blogs" variant="ghost" className="shrink-0 self-start sm:self-auto">
              All blogs
            </ButtonLink>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.id} delay={index * 0.05}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
