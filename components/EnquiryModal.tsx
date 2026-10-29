"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { site } from "@/data";
import EnquiryForm from "@/components/EnquiryForm";
import { Close } from "@/components/Icons";

/** Call-to-action looks of the enquiry buttons; hovers follow the Maison Élva website (filled → white, outline → filled, link → underlined) */
const button = {
  base: "inline-flex items-center justify-center gap-2 font-display text-sm tracking-[0.18em] uppercase transition-colors",
  solid: "border border-maroon bg-maroon px-7 py-3.5 text-white shadow-[0_10px_30px_-12px_rgba(79,21,29,0.6)] hover:bg-white hover:text-maroon",
  outline: "border border-maroon px-7 py-3.5 text-maroon hover:bg-maroon hover:text-white",
  link: "text-maroon underline-offset-4 hover:text-maroon-dark hover:underline",
} as const;

type ButtonVariant = Exclude<keyof typeof button, "base">;

type EnquiryContextValue = { open: (enquiryFor?: string) => void };

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

/**
 * Holds the one enquiry form of the landing page in a modal; every call-to-action opens it
 * (optionally with "Enquiry For" already chosen, e.g. the collection card that was clicked).
 */
export default function EnquiryModal({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const form = site.enquiryFormSection;
  const [enquiryFor, setEnquiryFor] = useState("");
  // incremented on every open so the form starts empty each time
  const [round, setRound] = useState(0);

  const open = useCallback(
    (value = "") => {
      setEnquiryFor(form.enquiryOptions.includes(value) ? value : "");
      setRound((count) => count + 1);
      dialog.current?.showModal();
      // locked on <html>: the mobile menu unlocks <body> when it closes right before this opens
      document.documentElement.style.overflow = "hidden";
    },
    [form.enquiryOptions],
  );

  const close = useCallback(() => dialog.current?.close(), []);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onClose = () => {
      document.documentElement.style.overflow = "";
    };
    el.addEventListener("close", onClose);
    return () => el.removeEventListener("close", onClose);
  }, []);

  return (
    <EnquiryContext.Provider value={{ open }}>
      {children}
      <dialog
        ref={dialog}
        aria-labelledby="enquiry-title"
        // a click on the dimmed backdrop (the dialog itself, outside the card) closes it
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto overscroll-contain bg-transparent p-0 backdrop:bg-maroon-dark/70 backdrop:backdrop-blur-sm open:transition-[opacity,translate] open:duration-500 open:ease-[cubic-bezier(0.22,1,0.36,1)] open:starting:translate-y-5 open:starting:opacity-0"
      >
        <div className="grid bg-page shadow-2xl md:grid-cols-[0.85fr_1.15fr]">
          <div className="relative hidden md:block">
            <Image quality={90} src={form.image} alt="" fill sizes="(min-width: 768px) 380px, 0px" className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-maroon-dark/90 via-maroon-dark/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-white">
              <p className="font-display text-xs uppercase tracking-[0.3em] text-gold-light">{form.imageLabel}</p>
              <p className="mt-3 font-serif text-3xl italic leading-tight">{form.imageQuote}</p>
            </div>
          </div>

          <div className="relative p-6 sm:p-10">
            <button
              type="button"
              onClick={close}
              aria-label={form.closeModalLabel}
              className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-line text-maroon transition hover:bg-maroon hover:text-white"
            >
              <Close className="size-5" />
            </button>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-gold">{form.label}</p>
            <h2 id="enquiry-title" className="mt-2 pr-10 font-serif text-3xl font-semibold text-maroon sm:text-4xl">
              {form.title}
            </h2>
            <p className="mt-2 text-sm text-muted">{form.description}</p>
            <EnquiryForm key={round} data={form} defaultEnquiryFor={enquiryFor} compact />
          </div>
        </div>
      </dialog>
    </EnquiryContext.Provider>
  );
}

/** A call-to-action button that opens the enquiry modal */
export function EnquiryButton({
  enquiryFor,
  variant = "solid",
  className = "",
  onClick,
  children,
}: {
  enquiryFor?: string;
  variant?: ButtonVariant;
  className?: string;
  /** runs as well, e.g. to close the mobile menu */
  onClick?: () => void;
  children: ReactNode;
}) {
  const context = useContext(EnquiryContext);
  if (!context) throw new Error("EnquiryButton must be inside <EnquiryModal>");
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        context.open(enquiryFor);
      }}
      className={`${button.base} ${button[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
