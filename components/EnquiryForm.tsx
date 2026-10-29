"use client";

import { useState } from "react";
import { site, type MaisonElvaEnquiryFormData, type SectionProps } from "@/data";
import { useDummySubmit } from "@/components/useDummySubmit";
import { ChevronDown } from "@/components/Icons";
import FormSuccess, { Spinner } from "@/components/FormSuccess";

/** Soft form fields */
const field =
  "w-full appearance-none border border-line bg-field px-4 text-sm text-ink outline-none transition-colors placeholder:text-subtle focus:border-gold";

function SelectField({
  name,
  placeholder,
  options,
  required,
  className,
}: {
  name: string;
  placeholder: string;
  options: string[];
  required?: boolean;
  className: string;
}) {
  const [value, setValue] = useState("");

  return (
    <div className="relative">
      <select
        name={name}
        required={required}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        aria-label={placeholder}
        // shows the placeholder grey until an option is picked
        className={`${field} ${className} cursor-pointer pr-10 ${value === "" ? "text-subtle" : "text-ink"}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="text-ink">
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-gold" />
    </div>
  );
}

/** The enquiry form in the contact section */
export default function EnquiryForm({
  data: form = site.enquiryFormSection,
}: SectionProps<MaisonElvaEnquiryFormData>) {
  const submit = useDummySubmit();
  const height = "h-13";

  return (
    <>
      {/* remounting the form (via key) after each send clears every field, including the controlled selects */}
      <form
        key={submit.round}
        onSubmit={submit.onSubmit}
        onInput={submit.onInput}
        aria-busy={submit.sending}
        // on desktop the message box takes up any spare height of the contact section card
        className="mt-6 grid gap-4 sm:grid-cols-2 lg:flex-1 lg:grid-rows-[auto_auto_auto_1fr_auto]"
      >
        <input name="name" required placeholder={form.fields.name} aria-label={form.fields.name} autoComplete="name" className={`${field} ${height}`} />
        <input name="phone" type="tel" required placeholder={form.fields.phone} aria-label={form.fields.phone} autoComplete="tel" className={`${field} ${height}`} />
        <input
          name="email"
          type="email"
          required
          placeholder={form.fields.email}
          aria-label={form.fields.email}
          autoComplete="email"
          className={`${field} ${height} sm:col-span-2`}
        />
        <SelectField
          name="enquiryFor"
          placeholder={form.fields.enquiryFor}
          options={form.enquiryOptions}
          required
          className={height}
        />
        <SelectField name="budget" placeholder={form.fields.budget} options={form.budgetOptions} className={height} />
        <textarea
          name="message"
          required
          rows={4}
          placeholder={form.fields.message}
          aria-label={form.fields.message}
          className={`${field} resize-y py-3 sm:col-span-2 lg:h-full`}
        />
        <button
          type="submit"
          disabled={submit.sending}
          className="flex h-13 items-center justify-center gap-3 border border-maroon bg-maroon font-display text-sm uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-maroon disabled:cursor-wait disabled:opacity-80 sm:col-span-2"
        >
          {submit.sending ? (
            <>
              <Spinner className="size-5" />
              {form.sending}
            </>
          ) : (
            form.button
          )}
        </button>
      </form>
      {submit.showMessage && (
        <FormSuccess
          name={submit.name}
          title={form.successTitle}
          message={form.success}
          leaving={submit.status === "leaving"}
          visibleFor={submit.visibleFor}
          onClose={submit.dismiss}
          closeLabel={form.closeLabel}
          className="mt-4"
        />
      )}
    </>
  );
}
