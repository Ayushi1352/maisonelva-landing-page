import siteData from "./site.json";

// ── Root Schema Types ──
export type MaisonElvaSchema = typeof siteData.MaisonElva;
export type MaisonElvaSections = MaisonElvaSchema["sections"];

// ── Universal SectionProps Interface (ai-builder Standard) ──
export interface SectionProps<T = unknown> {
  data?: T;
  className?: string;
  contentClassName?: string;
  variant?: string;
  isEditable?: boolean;
  onUpdate?: (newData: Partial<T>) => void;
}

// ── Strongly Typed Section Variant Data Models ──
export type MaisonElvaHeaderData = MaisonElvaSections["Header"]["variants"]["MaisonElvaHeader1"];
export type MaisonElvaHeroData = MaisonElvaSections["Hero"]["variants"]["MaisonElvaHero1"];
export type MaisonElvaAboutData = MaisonElvaSections["About"]["variants"]["MaisonElvaAbout1"];
export type MaisonElvaCollectionsData = MaisonElvaSections["Collections"]["variants"]["MaisonElvaCollections1"];
export type MaisonElvaGalleryData = MaisonElvaSections["Gallery"]["variants"]["MaisonElvaGallery1"];
export type MaisonElvaTestimonialsData = MaisonElvaSections["Testimonials"]["variants"]["MaisonElvaTestimonials1"];
export type MaisonElvaContactData = MaisonElvaSections["Contact"]["variants"]["MaisonElvaContact1"];
export type MaisonElvaEnquiryFormData = MaisonElvaSections["EnquiryForm"]["variants"]["MaisonElvaEnquiryForm1"];
export type MaisonElvaFooterData = MaisonElvaSections["Footer"]["variants"]["MaisonElvaFooter1"];

// ── Item-level types inferred from site.json ──
export type MaisonElvaLink = MaisonElvaHeaderData["navigation"][number];
export type MaisonElvaGalleryImage = MaisonElvaGalleryData["images"][number];
export type MaisonElvaTestimonial = MaisonElvaTestimonialsData["items"][number];

// ── Site Map for the single-page Maison Élva landing page ──
const sec = siteData.MaisonElva.sections;

const site = {
  theme: siteData.MaisonElva.theme,
  navbar: sec.Header.variants.MaisonElvaHeader1,
  hero: sec.Hero.variants.MaisonElvaHero1,
  aboutSection: sec.About.variants.MaisonElvaAbout1,
  collectionsSection: sec.Collections.variants.MaisonElvaCollections1,
  gallerySection: sec.Gallery.variants.MaisonElvaGallery1,
  testimonialsSection: sec.Testimonials.variants.MaisonElvaTestimonials1,
  contactSection: sec.Contact.variants.MaisonElvaContact1,
  enquiryFormSection: sec.EnquiryForm.variants.MaisonElvaEnquiryForm1,
  footer: sec.Footer.variants.MaisonElvaFooter1,
};

export { site };
export default siteData;
