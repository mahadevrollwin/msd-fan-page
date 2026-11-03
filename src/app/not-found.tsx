import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/layout/PageFrame";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page is not part of the MSD Archive.",
};

export default function NotFound() {
  return (
    <PageFrame
      kicker="404"
      title="This page is not in the archive."
      summary="The address may be mistyped, or the page has not been published."
    >
      <Link
        href="/"
        className="inline-flex min-h-12 items-center border border-gold px-5 text-xs font-medium uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-pitch"
      >
        Back to home
      </Link>
    </PageFrame>
  );
}
