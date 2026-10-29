import { site, type MaisonElvaContactData, type SectionProps } from "@/data";
import EnquiryForm from "@/components/EnquiryForm";
import { Mail, MapPin, Phone } from "@/components/Icons";

const icons = {
  location: MapPin,
  phone: Phone,
  mail: Mail,
} as const;

export default function ContactSection({ data: contact = site.contactSection, className = "" }: SectionProps<MaisonElvaContactData>) {
  return (
    <section className={`bg-page py-(--section-gap) ${className}`}>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
        <div>
          <div data-reveal className="max-w-xl">
            <p className="flex items-center gap-3 font-display text-xs uppercase tracking-[0.35em] text-gold">
              <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
              {contact.label}
              <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-[1.05] text-ink sm:text-5xl lg:text-[3.5rem]">
              {contact.titleTop} <em className="font-semibold text-maroon">{contact.titleAccent}</em>
            </h2>
            <p aria-hidden="true" className="mt-4 text-gold">
              ✦
            </p>
            <p className="mt-3 leading-relaxed text-muted">{contact.description}</p>
          </div>
          <ul data-reveal className="mt-8 grid gap-4">
            {contact.info.map((item) => {
              const Icon = icons[item.icon as keyof typeof icons];
              const external = item.href.startsWith("http");
              return (
                <li key={item.title}>
                  <a
                    href={item.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-4 border border-line p-5 transition-colors hover:border-gold"
                  >
                    <span className="grid size-12 shrink-0 place-items-center bg-maroon text-gold-light transition-colors group-hover:bg-gold group-hover:text-white">
                      <Icon className="size-5" />
                    </span>
                    <span>
                      <span className="block font-display tracking-wide text-maroon">{item.title}</span>
                      {item.lines.map((line) => (
                        <span key={line} className="block text-sm text-muted underline-offset-4 transition-colors group-hover:text-maroon group-hover:underline">
                          {line}
                        </span>
                      ))}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* on desktop the form card stretches to the height of the left column, so both end on the same line */}
        <div data-reveal className="relative flex flex-col bg-sand p-6 sm:p-10">
          <div aria-hidden="true" className="absolute left-0 top-0 h-1 w-full bg-linear-to-r from-maroon via-gold to-maroon" />
          <p className="font-display text-xs uppercase tracking-[0.3em] text-gold">{contact.form.label}</p>
          <h3 className="mt-2 font-serif text-3xl font-semibold text-maroon sm:text-4xl">{contact.form.title}</h3>
          <p className="mt-2 text-sm text-muted">{contact.form.description}</p>
          <EnquiryForm data={site.enquiryFormSection} />
        </div>
      </div>
    </section>
  );
}
