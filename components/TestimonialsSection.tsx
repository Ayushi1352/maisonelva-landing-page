import Image from "next/image";
import { site, type MaisonElvaTestimonialsData, type SectionProps } from "@/data";
import TestimonialSlider from "@/components/TestimonialSlider";

export default function TestimonialsSection({ data = site.testimonialsSection, className = "" }: SectionProps<MaisonElvaTestimonialsData>) {
  return (
    <section className={`bg-sand py-(--section-gap) ${className}`}>
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        <div data-reveal className="relative mx-auto w-full max-w-md">
          <div className="absolute inset-0 translate-x-2 translate-y-2 bg-maroon sm:translate-x-4 sm:translate-y-4" aria-hidden="true" />
          <div className="relative aspect-[786/978] overflow-hidden">
            <Image quality={90} src={data.image} alt={data.imageAlt} fill sizes="(min-width: 1024px) 440px, 90vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-8 right-0 bg-gold px-6 py-5 text-white shadow-xl sm:-right-8">
            <p className="font-serif text-4xl font-semibold">{data.rating.value}</p>
            <p className="text-xs uppercase tracking-wider">{data.rating.label}</p>
          </div>
        </div>
        <div>
          <div data-reveal className="max-w-xl">
            <p className="flex items-center gap-3 font-display text-xs uppercase tracking-[0.35em] text-gold">
              <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
              {data.label}
              <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-[1.05] text-ink sm:text-5xl lg:text-[3.5rem]">
              {data.titleTop} <em className="font-semibold text-maroon">{data.titleAccent}</em>
            </h2>
            <p aria-hidden="true" className="mt-4 text-gold">
              ✦
            </p>
            <p className="mt-3 leading-relaxed text-muted">{data.description}</p>
          </div>
          <div data-reveal className="mt-12">
            <TestimonialSlider data={data} />
          </div>
        </div>
      </div>
    </section>
  );
}
