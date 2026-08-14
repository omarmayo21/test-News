import React from "react";
import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { constructMetadata } from "@/lib/seo/metadata";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getContactPageData } from "@/lib/sanity/queries";

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
  const data = await getContactPageData();

  const kicker = data?.kicker?.[locale] || data?.kicker?.en || "Direct Technical Engagement";
  const title = data?.title?.[locale] || data?.title?.en || dict.contact.title;
  const subtitle = data?.subtitle?.[locale] || data?.subtitle?.en || dict.contact.subtitle;

  const contactBlocks = [
    {
      name: "GENERAL INQUIRIES",
      subtitle: "Get in Touch",
      description: "For corporate information, technical discussions, suppliers, service providers, and general business inquiries:",
      email: "info@nexusmines.com",
      phoneLabel: "Cairo Office",
      phone: "+20 2 3745 9141",
    },
    {
      name: "INVESTORS & PARTNERSHIPS",
      subtitle: "Discuss an Opportunity",
      description: "For investment opportunities, strategic partnerships, joint ventures, project development, and mining collaboration:",
      email: "invest@nexusmines.com",
      phoneLabel: "International / WhatsApp",
      phone: "+44 7453 421940",
    },
    {
      name: "CAIRO HEADQUARTERS",
      subtitle: "Nexus Resources",
      addressLines: [
        "20th Floor, North Tower",
        "Nile City Towers",
        "2005C Nile Corniche",
        "Cairo, Egypt",
        "Postal Code: 11221"
      ]
    }
  ];

  return (
    <div className="py-section-padding px-margin-mobile md:px-section-padding max-w-container-max mx-auto">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <span className="font-label text-label-md text-primary-gold uppercase tracking-widest block mb-4">
          {kicker}
        </span>
        <h1 className="font-headline font-headline-lg text-headline-lg text-primary-navy mb-6">
          {title}
        </h1>
        <p className="font-body text-body-lg text-on-surface opacity-80">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Contact Form Component */}
        <div className="bg-white p-8 md:p-10 border border-surface-container-high shadow-ambient">
          <h3 className="font-headline text-2xl text-primary-navy mb-6">
            Let&apos;s Work Together
          </h3>
          <ContactForm locale={locale} formType="contact" />
          
          {data?.consentText && (
            <p className="mt-6 text-body-sm text-on-surface opacity-70 italic text-center">
              {data.consentText?.[locale] || data.consentText?.en}
            </p>
          )}
        </div>

        {/* Office Locations & Contact Info */}
        <div className="space-y-12">
          {contactBlocks.map((block: any, idx: number) => (
            <div 
              key={idx} 
              className="p-8 bg-surface-container-low space-y-4 border-l-4 border-primary-gold"
            >
              <h3 className="font-headline text-headline-sm text-primary-navy uppercase tracking-wider">
                {block.name}
              </h3>
              {block.subtitle && (
                <p className="font-label text-label-md text-primary-gold font-bold">
                  {block.subtitle}
                </p>
              )}
              {block.description && (
                <p className="font-body text-body-md opacity-80 leading-relaxed">
                  {block.description}
                </p>
              )}
              {block.email && (
                <div className="flex items-center space-x-3 text-body-md opacity-80 pt-2">
                  <Mail className="w-5 h-5 flex-shrink-0 text-primary-gold" />
                  <span>Email: {block.email}</span>
                </div>
              )}
              {block.phone && (
                <div className="flex items-center space-x-3 text-body-md opacity-80">
                  <Phone className="w-5 h-5 flex-shrink-0 text-primary-gold" />
                  <span>{block.phoneLabel}: {block.phone}</span>
                </div>
              )}
              {block.addressLines && (
                <div className="flex items-start space-x-3 text-body-md opacity-80 pt-2">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-1 text-primary-gold" />
                  <div className="space-y-1">
                    {block.addressLines.map((line: string, i: number) => (
                      <div key={i}>{line}</div>
                    ))}
                    <div className="mt-4 font-bold uppercase tracking-wider text-xs underline cursor-pointer">
                      View on Google Maps →
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <div className="p-8 bg-surface-container-low border border-surface-container-high text-center">
             <p className="font-body text-body-md opacity-80 leading-relaxed">
               We welcome discussions with international mining companies, investors, project owners, license holders, and strategic partners interested in developing opportunities in Egypt.
             </p>
          </div>
        </div>
      </div>

      {/* Closing CTA */}
      {(data?.closingTitle || data?.closingSubtitle) && (
        <div className="mt-20 text-center bg-surface-container-low p-12 border border-surface-container-high">
          <h2 className="font-headline text-headline-md text-primary-navy mb-4">
            {data.closingTitle?.[locale] || data.closingTitle?.en}
          </h2>
          <p className="font-body text-body-lg opacity-80 max-w-2xl mx-auto mb-8">
            {data.closingSubtitle?.[locale] || data.closingSubtitle?.en}
          </p>
          {data.closingButtonLabel && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-block px-8 py-4 bg-primary-gold text-white font-label text-label-md uppercase tracking-widest hover:bg-primary-navy transition-colors duration-300"
            >
              {data.closingButtonLabel?.[locale] || data.closingButtonLabel?.en}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
