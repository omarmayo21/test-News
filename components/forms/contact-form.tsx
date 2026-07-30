"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";

const contactSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters."),
  honeypot: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  locale: Locale;
  formType?: "contact" | "quote" | "career";
}

export function ContactForm({ locale, formType = "contact" }: ContactFormProps) {
  const dict = getDictionary(locale);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, formType }),
      });
      const result = await res.json();

      if (res.ok && result.success) {
        setStatus("success");
        reset();
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl">
      {/* Honeypot Anti-Spam Field */}
      <input
        type="text"
        {...register("honeypot")}
        tabIndex={-1}
        autoComplete="off"
        className="hidden opacity-0 w-0 h-0 absolute pointer-events-none"
      />

      {status === "success" && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 flex items-start space-x-3 rounded-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm">{dict.contact.successTitle}</h4>
            <p className="text-xs mt-1">{dict.contact.successMessage}</p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="p-4 bg-rose-50 border border-rose-300 text-rose-800 flex items-start space-x-3 rounded-sm">
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
          <label className="block font-label text-label-md text-primary-navy uppercase tracking-wider mb-2">
            {dict.contact.fullName} *
          </label>
          <input
            type="text"
            {...register("fullName")}
            className="w-full p-3 bg-surface-container-low border-b-2 border-outline-variant focus:border-primary-gold focus:outline-none font-body text-body-md transition-colors"
          />
          {errors.fullName && <p className="text-xs text-rose-600 mt-1">{errors.fullName.message}</p>}
        </div>

        {/* Email Address */}
        <div>
          <label className="block font-label text-label-md text-primary-navy uppercase tracking-wider mb-2">
            {dict.contact.email} *
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-3 bg-surface-container-low border-b-2 border-outline-variant focus:border-primary-gold focus:outline-none font-body text-body-md transition-colors"
          />
          {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phone Number */}
        <div>
          <label className="block font-label text-label-md text-primary-navy uppercase tracking-wider mb-2">
            {dict.contact.phone}
          </label>
          <input
            type="tel"
            {...register("phone")}
            className="w-full p-3 bg-surface-container-low border-b-2 border-outline-variant focus:border-primary-gold focus:outline-none font-body text-body-md transition-colors"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block font-label text-label-md text-primary-navy uppercase tracking-wider mb-2">
            {dict.contact.company}
          </label>
          <input
            type="text"
            {...register("company")}
            className="w-full p-3 bg-surface-container-low border-b-2 border-outline-variant focus:border-primary-gold focus:outline-none font-body text-body-md transition-colors"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block font-label text-label-md text-primary-navy uppercase tracking-wider mb-2">
          {dict.contact.message} *
        </label>
        <textarea
          rows={5}
          {...register("message")}
          className="w-full p-3 bg-surface-container-low border-b-2 border-outline-variant focus:border-primary-gold focus:outline-none font-body text-body-md transition-colors"
        />
        {errors.message && <p className="text-xs text-rose-600 mt-1">{errors.message.message}</p>}
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
