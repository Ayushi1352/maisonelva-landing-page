import Image from "next/image";
import { site, type MaisonElvaFooterData, type SectionProps } from "@/data";
import { Facebook, Instagram, LinkedIn } from "@/components/Icons";

// The footer shows the same logo as the header, and the address, phone and email of the contact section
const { brand } = site.navbar;
const contactInfo = site.contactSection.info;

const socialIcons = { instagram: Instagram, facebook: Facebook, linkedin: LinkedIn } as const;

/** Fills `{year}` in the copyright line; cached so the footer can still be prerendered. */
async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export default async function Footer({ data: footer = site.footer }: SectionProps<MaisonElvaFooterData>) {
  const copyright = footer.copyright.replace("{year}", String(await currentYear()));

  return (
    <footer className="relative overflow-hidden bg-maroon-dark text-white/75">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-maroon-light/25 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-(--section-gap) sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.3fr] lg:px-8">
        <div>
          <div className="inline-block bg-page px-5 py-4">
            <Image quality={90} src={brand.logo.src} alt={brand.name} width={brand.logo.width} height={brand.logo.height} sizes="200px" className="h-auto w-44" />
          </div>
          <p className="mt-6 max-w-xs font-serif text-xl italic leading-snug text-white/85">{footer.tagline}</p>
          <div className="mt-6 flex gap-3">
            {footer.socials.map((social) => {
              const Icon = socialIcons[social.platform as keyof typeof socialIcons];
              return (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid size-10 place-items-center rounded-full border border-gold transition-colors hover:bg-gold hover:text-white"
                >
                  <Icon className="size-4.5" />
                </a>
              );
            })}
          </div>
        </div>

        <nav aria-label={footer.quickLinksTitle}>
          <h2 className="font-display text-sm uppercase tracking-[0.25em] text-gold-light">{footer.quickLinksTitle}</h2>
          <ul className="mt-6 grid gap-3">
            {footer.quickLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="group inline-flex items-center gap-2 text-sm transition-colors hover:text-gold-light hover:underline hover:underline-offset-4">
                  <span className="h-px w-3 bg-gold transition-all duration-300 group-hover:w-5" aria-hidden="true" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm uppercase tracking-[0.25em] text-gold-light">{footer.contactTitle}</h2>
          <ul className="mt-6 grid gap-4 text-sm">
            {contactInfo.map((item) => {
              const external = item.href.startsWith("http");
              return (
                <li key={item.title}>
                  <a
                    href={item.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="transition-colors hover:text-gold-light hover:underline hover:underline-offset-4"
                  >
                    {/* the address reads as one line here; phone and email show their first line */}
                    {item.icon === "location" ? item.lines.join(" ") : item.lines[0]}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center text-xs sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p>{copyright}</p>
          <p className="font-display uppercase tracking-[0.35em] text-gold-light">
            {footer.motto.map((word, index) => (
              <span key={word}>
                {index > 0 && <span className="text-white/30"> / </span>}
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
