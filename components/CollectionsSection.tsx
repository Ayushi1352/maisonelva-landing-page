import Image from "next/image";
import { site, type MaisonElvaCollectionsData, type SectionProps } from "@/data";
import { EnquiryButton } from "@/components/EnquiryModal";
import { ArrowRight } from "@/components/Icons";

/** Category cards, each with a "Contact Us" button that opens the enquiry form for that category, plus the featured edit */
export default function CollectionsSection({ data: collections = site.collectionsSection, className = "" }: SectionProps<MaisonElvaCollectionsData>) {
  const { featured } = collections;

  return (
    <section className={`bg-sand py-(--section-gap) ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="flex items-center gap-3 font-display text-xs uppercase tracking-[0.35em] text-gold justify-center">
            <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
            {collections.label}
            <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
          </p>
          <h2 className="mt-4 font-serif text-4xl font-medium leading-[1.05] text-ink sm:text-5xl lg:text-[3.5rem]">
            {collections.titleTop} <em className="font-semibold text-maroon">{collections.titleAccent}</em>
          </h2>
          <p aria-hidden="true" className="mt-4 text-gold">
            ✦
          </p>
          <p className="mt-3 leading-relaxed text-muted">{collections.description}</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.cards.map((card, index) => (
            <article
              key={card.title}
              data-reveal
              data-reveal-delay={(index % 3) * 100}
              className="group flex flex-col bg-page shadow-[0_20px_50px_-35px_rgba(58,15,21,0.5)] transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(58,15,21,0.55)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  quality={90}
                  src={card.image}
                  alt={`${card.title} collection`}
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span className="absolute left-4 top-4 bg-page/90 px-3 py-1 font-display text-[0.7rem] uppercase tracking-[0.2em] text-maroon">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-serif text-3xl font-semibold text-ink transition-colors group-hover:text-maroon">{card.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{card.text}</p>
                <div className="mt-6 border-t border-line pt-5">
                  <EnquiryButton variant="link" enquiryFor={card.title}>
                    {collections.cardButton}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </EnquiryButton>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Featured pieces */}
        <div data-reveal className="mt-20 grid items-center gap-10 border border-gold/30 bg-page p-6 sm:p-10 lg:grid-cols-[0.8fr_2fr]">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-gold">{featured.label}</p>
            <h3 className="mt-3 font-serif text-4xl font-medium leading-tight text-ink">
              {featured.titleTop} <em className="text-maroon">{featured.titleAccent}</em> {featured.titleBottom}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{featured.description}</p>
            <EnquiryButton variant="outline" enquiryFor={featured.button.enquiryFor} className="mt-6">
              {featured.button.label}
            </EnquiryButton>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:gap-5">
            {featured.items.map((item) => (
              <figure key={item.name} className="group">
                <div className="relative aspect-square overflow-hidden bg-sand">
                  <Image
                    quality={90}
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(min-width: 1024px) 260px, 30vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                </div>
                <figcaption className="mt-3 text-center">
                  <span className="block font-serif text-sm leading-tight text-ink sm:text-xl">{item.name}</span>
                  <span className="hidden text-[0.7rem] uppercase tracking-wider text-subtle sm:block">{featured.itemMeta}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
