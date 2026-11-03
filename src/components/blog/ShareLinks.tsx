"use client";

import { useState } from "react";
import { absoluteUrl } from "@/lib/seo";

type ShareLinksProps = {
  title: string;
  slug: string;
};

export function ShareLinks({ title, slug }: ShareLinksProps) {
  const [copied, setCopied] = useState(false);
  const url = absoluteUrl(`/blogs/${slug}`);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="border border-gold/20 bg-charcoal/50 p-5">
      <p className="text-xs uppercase tracking-[0.24em] text-gold">Share</p>
      <ul className="mt-4 flex flex-wrap gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center border border-white/15 px-4 text-xs uppercase tracking-[0.18em] text-cream transition-colors hover:border-gold hover:text-gold"
            >
              {link.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={copyLink}
            className="inline-flex min-h-11 items-center border border-white/15 px-4 text-xs uppercase tracking-[0.18em] text-cream transition-colors hover:border-gold hover:text-gold"
          >
            {copied ? "Copied" : "Copy link"}
          </button>
        </li>
      </ul>
      <p className="sr-only" aria-live="polite">
        {copied ? "Link copied to clipboard" : ""}
      </p>
    </div>
  );
}
