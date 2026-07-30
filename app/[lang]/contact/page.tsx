import React from "react";
import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { constructMetadata } from "@/lib/seo/metadata";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = (lang as Locale) || "en";
  return constructMetadata({
    title: "Contact Us - Nexus Resources",
    description: "Get in touch with our engineering and technical team in Cairo or international advisory offices.",
    locale,
    path: "/contact",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang as Locale) || "en";
  const dict = getDictionary(locale);

  return (
    <div className="py-section-padding px-margin-mobile md:px-section-padding max-w-container-max mx-auto">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <span className="font-label text-label-md text-primary-gold uppercase tracking-widest block mb-4">
          Direct Technical Engagement
        </span>
        <h1 className="font-headline font-headline-lg text-headline-lg text-primary-navy mb-6">
          {dict.contact.title}
        </h1>
        <p className="font-body text-body-lg text-on-surface opacity-80">
          {dict.contact.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Contact Form Component */}
        <div className="bg-white p-8 md:p-10 border border-surface-container-high shadow-ambient">
          <h3 className="font-headline text-2xl text-primary-navy mb-6">
            Send an Inquiry
          </h3>
          <ContactForm locale={locale} formType="contact" />
        </div>

        {/* Office Locations & Contact Info */}
        <div className="space-y-12">
          {/* Cairo Office */}
          <div className="p-8 bg-surface-container-low border-l-4 border-primary-gold space-y-4">
            <h3 className="font-headline text-headline-sm text-primary-navy">
              Cairo Headquarters
            </h3>
            <div className="flex items-start space-x-3 text-body-md opacity-80">
              <MapPin className="w-5 h-5 text-primary-gold flex-shrink-0 mt-1" />
              <span>{dict.contact.cairoAddress}</span>
            </div>
            <div className="flex items-center space-x-3 text-body-md opacity-80">
              <Phone className="w-5 h-5 text-primary-gold flex-shrink-0" />
              <span>+20 2 2790 1842</span>
            </div>
            <div className="flex items-center space-x-3 text-body-md opacity-80">
              <Mail className="w-5 h-5 text-primary-gold flex-shrink-0" />
              <span>contact@nexus-resources.com</span>
            </div>
            <div className="flex items-center space-x-3 text-body-md opacity-80 pt-2 border-t border-outline-variant">
              <Clock className="w-5 h-5 text-primary-gold flex-shrink-0" />
              <span>Sunday - Thursday: 08:30 - 17:30 (EET)</span>
            </div>
          </div>

          {/* International Office */}
          <div className="p-8 bg-surface-container-low border-l-4 border-primary-navy space-y-4">
            <h3 className="font-headline text-headline-sm text-primary-navy">
              International Advisory
            </h3>
            <div className="flex items-start space-x-3 text-body-md opacity-80">
              <MapPin className="w-5 h-5 text-primary-navy flex-shrink-0 mt-1" />
              <span>Suite 400, 100 Bishopsgate, London, UK</span>
            </div>
            <div className="flex items-center space-x-3 text-body-md opacity-80">
              <Phone className="w-5 h-5 text-primary-navy flex-shrink-0" />
              <span>+44 20 7946 0912</span>
            </div>
            <div className="flex items-center space-x-3 text-body-md opacity-80">
              <Mail className="w-5 h-5 text-primary-navy flex-shrink-0" />
              <span>uk@nexus-resources.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
