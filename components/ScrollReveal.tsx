"use client";

import { useEffect } from "react";

/**
 * Plays a soft fade-up on every [data-reveal] element the first time it scrolls into view
 * (data-reveal-delay="ms" staggers cards in a row).
 * Only elements that start below the screen are animated, so nothing visible on load ever blinks;
 * the server HTML is left untouched (no hidden state without JavaScript) and reduced motion skips it.
 * Elements are hidden by a paused animation, never by a style attribute, so an element that React has
 * not hydrated yet never differs from its server HTML.
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const reveals = new Map<Element, Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          reveals.get(entry.target)?.play();
        }
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.12 },
    );

    const targets = [...document.querySelectorAll<HTMLElement>("[data-reveal]")].filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight,
    );
    for (const el of targets) {
      // Paused on its first frame (fill: backwards), so the element waits hidden until it is played
      const reveal = el.animate(
        [
          { opacity: 0, translate: "0 1.75rem" },
          { opacity: 1, translate: "0 0" },
        ],
        {
          duration: 900,
          delay: Number(el.dataset.revealDelay ?? 0),
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "backwards",
        },
      );
      reveal.pause();
      reveals.set(el, reveal);
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
      for (const reveal of reveals.values()) if (reveal.playState !== "finished") reveal.cancel();
    };
  }, []);

  return null;
}
