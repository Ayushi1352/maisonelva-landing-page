"use client";

import { useEffect, useState } from "react";
import { site, type MaisonElvaTestimonialsData, type SectionProps } from "@/data";
import { ChevronLeft, ChevronRight } from "@/components/Icons";

const AUTOPLAY_MS = 6000;

/** One quote at a time; moves on by itself and waits while the visitor hovers it */
export default function TestimonialSlider({ data = site.testimonialsSection }: SectionProps<MaisonElvaTestimonialsData>) {
  const { items } = data;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const item = items[index];
  const go = (step: number) => setIndex((current) => (current + step + items.length) % items.length);

  useEffect(() => {
    if (paused || items.length < 2) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % items.length), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, items.length]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative min-h-[15rem] sm:min-h-[13rem]" aria-live="polite">
        <span aria-hidden="true" className="absolute -left-2 -top-10 font-serif text-[7rem] leading-none text-gold/30">
          “
        </span>
        {/* keyed by slide, so each new quote fades in */}
        <blockquote key={index} className="relative transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] starting:translate-y-7 starting:opacity-0">
          <p className="font-serif text-2xl italic leading-relaxed text-ink sm:text-[1.75rem]">{item.quote}</p>
          <footer className="mt-6 flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-maroon font-display text-lg text-gold-light">
              {item.name[0]}
            </span>
            <span>
              <span className="block font-display tracking-wide text-maroon">{item.name}</span>
              <span className="text-sm text-subtle">
                {data.role} · {item.city}
              </span>
            </span>
            <span className="ml-auto hidden text-gold sm:block" role="img" aria-label={data.ratingLabel}>
              ★★★★★
            </span>
          </footer>
        </blockquote>
      </div>

      <div className="mt-10 flex items-center gap-4">
        <button
          type="button"
          aria-label={data.previousLabel}
          onClick={() => go(-1)}
          className="grid size-11 place-items-center rounded-full border border-maroon/30 text-maroon transition-colors hover:border-gold hover:text-gold"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label={data.nextLabel}
          onClick={() => go(1)}
          className="grid size-11 place-items-center rounded-full border border-maroon/30 text-maroon transition-colors hover:border-gold hover:text-gold"
        >
          <ChevronRight className="size-5" />
        </button>
        <div className="ml-2 flex gap-2">
          {items.map((testimonial, n) => (
            <button
              key={testimonial.name}
              type="button"
              aria-label={data.showLabel.replace("{name}", testimonial.name)}
              aria-current={n === index}
              onClick={() => setIndex(n)}
              className={`h-1.5 rounded-full transition-all duration-500 ${n === index ? "w-8 bg-maroon" : "w-3 bg-maroon/20 hover:bg-maroon/40"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
