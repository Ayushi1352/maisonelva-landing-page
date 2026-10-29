"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site, type MaisonElvaHeaderData, type SectionProps } from "@/data";
import { EnquiryButton } from "@/components/EnquiryModal";
import { Close, Menu } from "@/components/Icons";

/** id of the landing page section a link points to ("#about" → "about") */
const sectionId = (href: string) => href.replace(/^#/, "");

/** Keeps track of the section in the middle of the screen, so its link is shown as the current one */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export default function Navbar({ data = site.navbar }: SectionProps<MaisonElvaHeaderData>) {
  const { brand, navigation: links, cta, labels } = data;
  const [ids] = useState(() => links.map((link) => sectionId(link.href)));
  const active = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 mx-auto max-w-[1920px] transition-all duration-300 ${
        scrolled || open ? "bg-page/95 shadow-[0_8px_30px_-18px_rgba(58,15,21,0.35)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <a href={links[0].href} onClick={() => setOpen(false)} aria-label={labels.home}>
          <Image
            quality={90}
            src={brand.logo.src}
            alt={brand.logo.alt}
            width={brand.logo.width}
            height={brand.logo.height}
            preload
            sizes="200px"
            className="h-auto w-36 sm:w-44"
          />
        </a>

        <nav aria-label={labels.mainNav} className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const current = sectionId(link.href) === active;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={current ? "location" : undefined}
                className={`relative px-3 py-2 font-display text-[0.8rem] uppercase tracking-[0.12em] transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-center after:bg-maroon after:transition-transform after:duration-300 ${
                  current ? "text-maroon after:scale-x-100" : "text-ink after:scale-x-0 hover:text-maroon"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <EnquiryButton className="px-6! py-3! max-sm:hidden">{cta.label}</EnquiryButton>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? labels.closeMenu : labels.openMenu}
            className="grid size-11 place-items-center border border-line text-maroon lg:hidden"
          >
            {open ? <Close className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label={labels.mobileNav}
        className={`overflow-hidden border-t bg-page transition-[max-height] duration-500 lg:hidden ${
          open ? "max-h-[calc(100dvh-5rem)] border-line" : "max-h-0 border-transparent"
        }`}
      >
        <ul className="flex flex-col px-4 py-4 sm:px-6">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between border-b border-line/70 py-3.5 font-display text-sm uppercase tracking-[0.15em] transition-colors hover:text-maroon ${
                  sectionId(link.href) === active ? "text-maroon" : "text-ink/80"
                }`}
              >
                {link.label}
                <span className="text-gold" aria-hidden="true">
                  ✦
                </span>
              </a>
            </li>
          ))}
          <li className="pt-5 sm:hidden">
            <EnquiryButton onClick={() => setOpen(false)} className="w-full">
              {cta.label}
            </EnquiryButton>
          </li>
        </ul>
      </nav>
    </header>
  );
}
