import type { Metadata } from "next";
import { PageFrame } from "@/components/layout/PageFrame";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for the unofficial MSD Archive fan page.",
};

export default function TermsPage() {
  return (
    <PageFrame
      kicker="Legal"
      title="Terms & Conditions"
      summary="The terms for using this unofficial fan page will be written in Sanity and rendered here. They are not stored in the page component."
    />
  );
}
