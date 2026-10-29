"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site, type MaisonElvaAboutData, type SectionProps } from "@/data";
import { EnquiryButton } from "@/components/EnquiryModal";

/** Counts up to `value` the first time it scrolls into view (shows the final number without JS or with reduced motion) */
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 1800, 1);
        setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    // only counts when it starts below the screen, so a number already in view never jumps back to 0
    if (el.getBoundingClientRect().top > window.innerHeight) {
      frame = requestAnimationFrame(() => setDisplay(0));
      observer.observe(el);
    }
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref}>
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

export default function AboutSection({ data: about = site.aboutSection, className = "" }: SectionProps<MaisonElvaAboutData>) {
  return (
    <section className={`bg-page py-(--section-gap) ${className}`}>
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div data-reveal className="relative mx-auto w-full max-w-lg pb-16 sm:pb-20">
          <div className="relative aspect-[710/969] w-[78%] overflow-hidden">
            <Image quality={90} src={about.primaryImage} alt={about.primaryImageAlt} fill sizes="(min-width: 1024px) 400px, 70vw" className="object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 aspect-[1040/1171] w-[52%] overflow-hidden border-8 border-page shadow-2xl">
            <Image quality={90} src={about.secondaryImage} alt={about.secondaryImageAlt} fill sizes="(min-width: 1024px) 270px, 45vw" className="object-cover" />
          </div>
          <span
            aria-hidden="true"
            className="absolute -left-4 top-8 rotate-180 font-display text-xs uppercase tracking-[0.4em] text-gold [writing-mode:vertical-rl] sm:-left-8"
          >
            {about.sideText}
          </span>
        </div>

        <div>
          <div data-reveal className="max-w-xl">
            <p className="flex items-center gap-3 font-display text-xs uppercase tracking-[0.35em] text-gold">
              <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
              {about.label}
              <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-[1.05] text-ink sm:text-5xl lg:text-[3.5rem]">
              {about.titleTop} <em className="font-semibold text-maroon">{about.titleAccent}</em>
            </h2>
            <p aria-hidden="true" className="mt-4 text-gold">
              ✦
            </p>
          </div>
          <div data-reveal className="mt-6 space-y-4 leading-relaxed text-muted">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div data-reveal className="mt-8 grid gap-4 sm:grid-cols-2">
            {about.statements.map((item) => (
              <div key={item.title} className="border-l-2 border-gold bg-sand/60 p-5">
                <h3 className="font-display tracking-wide text-maroon">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            ))}
          </div>

          <dl data-reveal className="mt-10 grid grid-cols-3 gap-4 border-y border-line py-6">
            {about.stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-serif text-3xl font-semibold text-maroon sm:text-5xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </dd>
                <dd aria-hidden="true" className="mt-1 text-[0.7rem] uppercase tracking-wider text-subtle sm:text-xs">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>

          <EnquiryButton className="mt-10">{about.button.label}</EnquiryButton>
        </div>
      </div>
    </section>
  );
}
