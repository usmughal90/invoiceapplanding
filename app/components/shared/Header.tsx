"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  navItems: NavItem[];
}

export default function Header({ navItems }: HeaderProps) {
  const items = navItems;

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  const pathname = usePathname();

  // Local pages where section scrolling exists
  const isLocalPage = pathname === "/" || /^\/brands\/[^/]+$/.test(pathname);

  const getSectionIdFromHref = (href: string) => {
    if (!href) return "";
    if (href.startsWith("#")) return href.slice(1);
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return "";
    return href.slice(hashIndex + 1);
  };

  /* ---------------- SCROLL SHADOW ---------------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------------- LOCK BODY SCROLL ---------------- */
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  /* ---------------- ACTIVE SECTION OBSERVER ---------------- */
  useEffect(() => {
    const ids = items
      .map((item) => getSectionIdFromHref(item.href))
      .filter(Boolean);

    const setFromHash = () => {
      const hash = window.location.hash?.replace("#", "") ?? "";
      if (hash) setActiveId(hash);
    };

    setFromHash();
    window.addEventListener("hashchange", setFromHash);

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) {
      return () => window.removeEventListener("hashchange", setFromHash);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          )[0];

        if (visible?.target?.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.4, 0.6],
      },
    );

    sections.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("hashchange", setFromHash);
      observer.disconnect();
    };
  }, [items]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-200 ${
        scrolled ? "bg-[#3359E7] border-b border-white" : "bg-[#3359E7]"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-8 sm:px-20">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold tracking-wide text-white uppercase"
          aria-label="Go to home"
          onClick={() => setMobileOpen(false)}
        >
          {/* Logo */}
          <Image
            src="/images/invoice-icon.webp"
            alt="Invoice logo"
            width={30}
            height={30}
            className="h-9 w-9 rounded-sm"
            priority
          />
          Invoice Maker Estimate App
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10 text-white text-lg font-medium">
          {items.map((item) => {
            const sectionId = getSectionIdFromHref(item.href);
            const isActive = activeId === sectionId;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative pb-2 transition-colors ${
                  isActive ? "text-white/80" : "hover:text-white/80"
                }`}
                onClick={() => setActiveId(sectionId)}
              >
                {item.label}

                {/* Active underline */}
                <span
                  className={`absolute left-1/2 -bottom-[2px] h-[2px] w-6 -translate-x-1/2 rounded-full bg-white transition-opacity duration-200 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Animated Hamburger */}
        <button
          type="button"
          className="lg:hidden relative flex h-10 w-10 items-center justify-center rounded-lg text-white transition-all duration-200 hover:bg-black/10"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <div className="relative h-6 w-6">
            <span
              className={`absolute left-0 top-1 h-[2.5px] w-full bg-current rounded-full transition-all duration-300 ${
                mobileOpen ? "top-1/2 -translate-y-1/2 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2.5px] w-full bg-current rounded-full transition-all duration-300 ${
                mobileOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 bottom-1 h-[2.5px] w-full bg-current rounded-full transition-all duration-300 ${
                mobileOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className="lg:hidden">
        <div
          className={`fixed inset-0 bg-black/30 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={`fixed right-0 top-0 h-dvh w-[80vw] max-w-sm bg-white shadow-xl transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between h-18 px-5 border-b">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold tracking-wide text-black uppercase"
              aria-label="Go to home"
              onClick={() => setMobileOpen(false)}
            >
              {/* Logo */}
              <Image
                src="/images/invoice-icon.webp"
                alt="Invoice logo"
                width={32}
                height={32}
                className="h-10 w-10 rounded-sm"
                priority
              />
              Invoice Maker Estimate App
            </Link>

            <button
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-black transition hover:bg-black/10"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Nav */}
          <nav className="p-4 space-y-2 text-black">
            {items.map((item) => {
              const sectionId = getSectionIdFromHref(item.href);
              const isActive = activeId === sectionId;

              const href =
                !isLocalPage && item.href.startsWith("#")
                  ? `/${item.href}`
                  : item.href;

              return (
                <Link
                  key={item.href}
                  href={href}
                  onClick={() => {
                    setActiveId(sectionId);
                    setMobileOpen(false);
                  }}
                  className={`block rounded-lg px-4 py-3 transition ${
                    isActive ? "bg-black/10 font-semibold" : "hover:bg-black/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
