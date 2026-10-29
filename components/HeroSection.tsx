import Image from "next/image";
import { site, type MaisonElvaHeroData, type SectionProps } from "@/data";

export default function HeroSection({ data: hero = site.hero, className = "" }: SectionProps<MaisonElvaHeroData>) {
  return (
    <section className={`relative overflow-hidden bg-sand pt-20 ${className}`}>
      {/* starts below the fixed header (h-20), so the header links never sit on the maroon panel */}
      <div aria-hidden="true" className="absolute bottom-0 right-0 top-20 hidden w-[44%] bg-maroon lg:block" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-(--section-gap) sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8">
        <div className="transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] starting:translate-y-7 starting:opacity-0">
          <p className="flex items-center gap-3 font-display text-xs uppercase tracking-[0.35em] text-gold">
            <span className="h-px w-10 bg-gold" aria-hidden="true" /> {hero.label}
          </p>
          <h1 className="mt-5 font-serif text-[3.25rem] font-medium leading-[0.95] text-ink sm:text-7xl lg:text-[6.25rem]">
            {hero.titleTop} <em className="font-semibold text-maroon">{hero.titleAccent}</em>
            <br />
            {hero.titleBottom}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">{hero.description}</p>
          {/* the one call-to-action scrolls down to the contact section */}
          <a
            href={hero.button.href}
            className="mt-9 inline-flex w-full items-center justify-center gap-2 border border-maroon bg-maroon px-7 py-3.5 font-display text-sm uppercase tracking-[0.18em] text-white shadow-[0_10px_30px_-12px_rgba(79,21,29,0.6)] transition-colors hover:bg-white hover:text-maroon sm:w-auto"
          >
            {hero.button.label}
          </a>
          <dl className="mt-12 grid max-w-md grid-cols-3 divide-x divide-gold/30 border-t border-gold/30 pt-6">
            {hero.highlights.map((item) => (
              <div key={item.title} className="px-3 first:pl-0">
                <dt className="font-display text-sm uppercase tracking-wider text-maroon">{item.title}</dt>
                <dd className="mt-1 text-xs text-subtle">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md delay-150 lg:max-w-none transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] starting:translate-y-7 starting:opacity-0">
          <div className="absolute -inset-3 border border-gold/60 sm:-inset-4" aria-hidden="true" />
          <div className="relative aspect-[1174/1283] overflow-hidden">
            <Image
              quality={90}
              src={hero.image}
              alt={hero.imageAlt}
              fill
              preload
              sizes="(min-width: 1024px) 560px, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-0 bg-page px-5 py-4 shadow-xl sm:-left-10">
            <p className="font-serif text-3xl font-semibold text-maroon">{hero.badge.value}</p>
            <p className="text-xs uppercase tracking-wider text-muted">{hero.badge.label}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
