import type { Metadata } from "next";
import { PageFrame } from "@/components/layout/PageFrame";

export const metadata: Metadata = {
  title: "About",
  description:
    "About this unofficial MS Dhoni fan page, and the cricket journey it will document from Sanity.",
};

export default function AboutPage() {
  return (
    <PageFrame
      kicker="The record"
      title="About"
      summary="The story of this fan page, and a visual telling of MS Dhoni's cricket journey, will be edited in Sanity and shown here."
    />
  );
}
