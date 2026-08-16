"use client";

import React, { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";

interface ContactFormProps {
  locale: Locale;
  formType?: "contact" | "quote" | "career";
}

export function ContactForm({ locale, formType = "contact" }: ContactFormProps) {
  const dict = getDictionary(locale);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, formType }),
      });
      const result = await res.json();

      if (res.ok && result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(result.message || dict.contact.errorMessage);
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(dict.contact.errorMessage);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-xl">
      {/* Honeypot Anti-Spam Field */}
      <input
        type="text"
        name="honeypot"
        tabIndex={-1}
        autoComplete="off"
        className="hidden opacity-0 w-0 h-0 absolute pointer-events-none"
      />

      {status === "success" && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 flex items-start space-x-3 rounded-sm" role="status">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm">{dict.contact.successTitle}</h4>
            <p className="text-xs mt-1">{dict.contact.successMessage}</p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="p-4 bg-rose-50 border border-rose-300 text-rose-800 flex items-start space-x-3 rounded-sm" role="alert">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm">{dict.contact.errorTitle}</h4>
            <p className="text-xs mt-1">{errorMessage}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block font-label text-label-md text-primary-navy uppercase tracking-wider mb-2">
            {dict.contact.fullName} *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            minLength={2}
            className="w-full p-3 bg-surface-container-low border-b-2 border-outline-variant focus:border-primary-gold focus:outline-none font-body text-body-md transition-colors"
          />
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="email" className="block font-label text-label-md text-primary-navy uppercase tracking-wider mb-2">
            {dict.contact.email} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full p-3 bg-surface-container-low border-b-2 border-outline-variant focus:border-primary-gold focus:outline-none font-body text-body-md transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phone Number */}
        <div>
          <label htmlFor="phone" className="block font-label text-label-md text-primary-navy uppercase tracking-wider mb-2">
            {dict.contact.phone}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full p-3 bg-surface-container-low border-b-2 border-outline-variant focus:border-primary-gold focus:outline-none font-body text-body-md transition-colors"
          />
        </div>

        {/* Country */}
        <div>
          <label htmlFor="country" className="block font-label text-label-md text-primary-navy uppercase tracking-wider mb-2">
            Country *
          </label>
          <input
            type="text"
            id="country"
            name="country"
            required
            className="w-full p-3 bg-surface-container-low border-b-2 border-outline-variant focus:border-primary-gold focus:outline-none font-body text-body-md transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inquiry Type */}
        <div>
          <label htmlFor="inquiryType" className="block font-label text-label-md text-primary-navy uppercase tracking-wider mb-2">
            Inquiry Type *
          </label>
          <select
            id="inquiryType"
            name="inquiryType"
            required
            defaultValue=""
            className="w-full p-3 bg-surface-container-low border-b-2 border-outline-variant focus:border-primary-gold focus:outline-none font-body text-body-md transition-colors appearance-none"
          >
            <option value="" disabled>Select Inquiry Type</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Investment Opportunity">Investment Opportunity</option>
            <option value="Strategic Partnership">Strategic Partnership</option>
            <option value="Mining Project">Mining Project</option>
            <option value="Exploration Opportunity">Exploration Opportunity</option>
            <option value="Technical Collaboration">Technical Collaboration</option>
            <option value="Supplier / Contractor">Supplier / Contractor</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block font-label text-label-md text-primary-navy uppercase tracking-wider mb-2">
            {dict.contact.company}
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className="w-full p-3 bg-surface-container-low border-b-2 border-outline-variant focus:border-primary-gold focus:outline-none font-body text-body-md transition-colors"
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block font-label text-label-md text-primary-navy uppercase tracking-wider mb-2">
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="w-full p-3 bg-surface-container-low border-b-2 border-outline-variant focus:border-primary-gold focus:outline-none font-body text-body-md transition-colors"
        />
      </div>



      {/* Message */}
      <div>
        <label htmlFor="message" className="block font-label text-label-md text-primary-navy uppercase tracking-wider mb-2">
          {dict.contact.message} *
        </label>
        <textarea
          rows={5}
          id="message"
          name="message"
          required
          minLength={5}
          className="w-full p-3 bg-surface-container-low border-b-2 border-outline-variant focus:border-primary-gold focus:outline-none font-body text-body-md transition-colors"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center px-8 py-4 bg-primary-gold text-white font-label text-label-md uppercase tracking-widest hover:bg-primary-navy transition-colors duration-300 disabled:opacity-50"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            {dict.contact.submitting}
          </>
        ) : (
          dict.contact.submit
        )}
      </button>
    </form>
  );
}
