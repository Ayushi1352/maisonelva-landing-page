import { Check, Close } from "@/components/Icons";

type FormSuccessProps = {
  name: string;
  title: string;
  message: string;
  leaving: boolean;
  visibleFor: number;
  onClose: () => void;
  closeLabel: string;
  className?: string;
};

/** Thank-you card shown after a (dummy) form submission; fades out on its own */
export default function FormSuccess({ name, title, message, leaving, visibleFor, onClose, closeLabel, className = "" }: FormSuccessProps) {
  const heading = name ? title.replace("{name}", name) : title.replace(", {name}", "").replace("{name}", "");

  return (
    <div
      role="status"
      aria-live="polite"
      className={`relative overflow-hidden border border-line bg-sand/70 py-4 pl-4 pr-11 transition-[opacity,translate] ease-[ease] starting:translate-y-2 starting:opacity-0 ${
        // fades in when shown; fades out (duration = fadeFor in useDummySubmit) before it is removed
        leaving ? "-translate-y-1.5 opacity-0 duration-[400ms]" : "duration-[450ms]"
      } ${className}`}
    >
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-maroon text-gold-light">
          <Check className="size-4.5" />
        </span>
        <div>
          <p className="font-serif text-xl font-semibold text-maroon">{heading}</p>
          <p className="mt-0.5 text-sm text-muted">{message}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="absolute right-2.5 top-2.5 grid size-8 place-items-center rounded-full text-maroon transition-colors hover:bg-line"
      >
        <Close className="size-4" />
      </button>
      {/* time left before the message closes itself */}
      <span
        className="absolute bottom-0 left-0 h-[3px] w-0 bg-gold/70 transition-[width] ease-linear starting:w-full"
        style={{ transitionDuration: `${visibleFor}ms` }}
        aria-hidden="true"
      />
    </div>
  );
}

/** small spinner for the submit button while the dummy request runs */
export function Spinner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`animate-spin ${className}`} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
