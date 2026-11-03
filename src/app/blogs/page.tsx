import type { Metadata } from "next";
import { PageFrame } from "@/components/layout/PageFrame";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Essays and match notes from an unofficial MS Dhoni fan archive. Articles will be published from the CMS.",
};

export default function BlogsPage() {
  return (
    <PageFrame
      kicker="The writing"
      title="Blogs"
      summary="Match notes and longer reads will be listed here, newest first, once they are published from Sanity."
    />
  );
}
