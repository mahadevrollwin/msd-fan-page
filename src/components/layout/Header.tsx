"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { BrandLockup } from "@/components/layout/BrandLockup";
import { Container } from "@/components/ui/Container";
import { Seam } from "@/components/ui/Seam";
import { cn } from "@/lib/cn";
import { primaryNav, type SiteHref } from "@/lib/site";

function isActive(pathname: string, href: SiteHref) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const linkClass =
  "relative inline-flex min-h-11 items-center text-sm uppercase tracking-[0.18em] text-mist transition-colors hover:text-cream after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform hover:after:scale-x-100";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    const frame = window.requestAnimationFrame(onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const toggle = toggleRef.current;
    const links = panel
      ? Array.from(panel.querySelectorAll<HTMLElement>("a, button"))
      : [];
    const focusable = [toggle, ...links].filter((node): node is HTMLElement => node !== null);
    links[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle?.focus();
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
    <header
      className={cn(
        "sticky top-0 z-50 border-t-2 border-gold bg-pitch",
        scrolled || open ? "shadow-[0_16px_40px_rgb(0_0_0_/_0.35)]" : "",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-20">
        <BrandLockup />
        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {primaryNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(linkClass, active && "text-gold after:scale-x-100")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          ref={toggleRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border border-gold/40 text-cream lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </Container>
      <Seam className="text-gold/35" />
    </header>
      {open ? (
        <div
          ref={panelRef}
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
          className="fixed inset-0 z-40 overflow-y-auto bg-pitch pt-[4.9rem] sm:pt-[6rem] lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col px-5 py-6 sm:px-8">
            {primaryNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-16 flex-col justify-center gap-1 border-b border-gold/15 py-3",
                    active ? "text-gold" : "text-cream",
                  )}
                >
                  <span className="font-display text-4xl tracking-[0.06em]">{item.label}</span>
                  <span className="font-sans text-xs uppercase tracking-[0.2em] text-mist">
                    {item.note}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </>
  );
}

export function HeaderFallback() {
  return (
    <header className="sticky top-0 z-50 border-t-2 border-gold bg-pitch">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <BrandLockup />
      </Container>
      <Seam className="text-gold/35" />
    </header>
  );
}
