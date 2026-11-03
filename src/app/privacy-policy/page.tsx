import type { Metadata } from "next";
import { PageFrame } from "@/components/layout/PageFrame";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the unofficial MSD Archive fan page.",
};

export default function PrivacyPage() {
  return (
    <PageFrame
      kicker="Legal"
      title="Privacy Policy"
      summary="The privacy policy will be written in Sanity and rendered here. It is not stored in the page component."
    />
  );
}
