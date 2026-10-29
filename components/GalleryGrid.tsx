"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import { site, type MaisonElvaGalleryData, type SectionProps } from "@/data";
import { ChevronLeft, ChevronRight, Close } from "@/components/Icons";

function ViewerButton({ label, className, onClick, children }: { label: string; className: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`absolute grid size-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:text-gold-light ${className}`}
    >
      {children}
    </button>
  );
}

/** Photo grid (two tall photos break the rhythm) that opens each photo in a full-screen viewer */
export default function GalleryGrid({ data = site.gallerySection }: SectionProps<MaisonElvaGalleryData>) {
  const { images } = data;
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const show = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const step = (delta: number) => setIndex((i) => (i === null ? i : (i + delta + images.length) % images.length));

  return (
    <>
      <div className="grid auto-rows-[9.375rem] grid-cols-2 gap-3 sm:auto-rows-[13.75rem] sm:gap-4 md:grid-cols-3 lg:auto-rows-[15.625rem]">
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            onClick={() => show(i)}
            data-reveal
            data-reveal-delay={(i % 3) * 90}
            className={`group relative cursor-zoom-in overflow-hidden bg-sand ${i === 0 || i === 4 ? "row-span-2" : ""}`}
          >
            <Image
              quality={90}
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
            <span className="absolute inset-0 flex items-end bg-linear-to-t from-maroon-dark/85 via-maroon-dark/10 to-transparent p-4 text-left opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 sm:p-6">
              <span className="font-serif text-lg italic leading-snug text-white sm:text-2xl">{image.alt}</span>
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialog}
        aria-label={data.viewerLabel}
        onClose={() => setIndex(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        className="m-auto h-[min(85dvh,900px)] w-[calc(100%-2rem)] max-w-5xl bg-transparent p-0 backdrop:bg-black/85 open:transition-[opacity,translate] open:duration-500 open:ease-[cubic-bezier(0.22,1,0.36,1)] open:starting:translate-y-5 open:starting:opacity-0"
      >
        {index !== null && (
          <figure className="relative flex h-full flex-col">
            <div className="relative flex-1">
              <Image quality={90} src={images[index].src} alt={images[index].alt} fill sizes="100vw" className="object-contain" />
            </div>
            <figcaption className="pt-4 text-center font-serif text-xl italic text-white">
              {images[index].alt}
              <span className="ml-3 font-sans text-xs not-italic text-white/60">
                {index + 1} / {images.length}
              </span>
            </figcaption>
            <ViewerButton label={data.closeLabel} className="right-2 top-2" onClick={() => dialog.current?.close()}>
              <Close className="size-5" />
            </ViewerButton>
            <ViewerButton label={data.previousLabel} className="left-2 top-1/2 -translate-y-1/2" onClick={() => step(-1)}>
              <ChevronLeft className="size-5" />
            </ViewerButton>
            <ViewerButton label={data.nextLabel} className="right-2 top-1/2 -translate-y-1/2" onClick={() => step(1)}>
              <ChevronRight className="size-5" />
            </ViewerButton>
          </figure>
        )}
      </dialog>
    </>
  );
}
