import { site, type MaisonElvaGalleryData, type SectionProps } from "@/data";
import GalleryGrid from "@/components/GalleryGrid";
import { EnquiryButton } from "@/components/EnquiryModal";

export default function GallerySection({ data: gallery = site.gallerySection, className = "" }: SectionProps<MaisonElvaGalleryData>) {
  return (
    <section className={`bg-page py-(--section-gap) ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="flex items-center gap-3 font-display text-xs uppercase tracking-[0.35em] text-gold justify-center">
            <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
            {gallery.label}
            <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
          </p>
          <h2 className="mt-4 font-serif text-4xl font-medium leading-[1.05] text-ink sm:text-5xl lg:text-[3.5rem]">
            {gallery.titleTop} <em className="font-semibold text-maroon">{gallery.titleAccent}</em>
          </h2>
          <p aria-hidden="true" className="mt-4 text-gold">
            ✦
          </p>
          <p className="mt-3 leading-relaxed text-muted">{gallery.description}</p>
        </div>
        <div className="mt-14">
          <GalleryGrid data={gallery} />
        </div>
        <div data-reveal className="mt-12 text-center">
          <EnquiryButton variant="outline">{gallery.button.label}</EnquiryButton>
        </div>
      </div>
    </section>
  );
}
