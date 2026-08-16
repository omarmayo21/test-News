import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Building, MessageSquare, ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { constructMetadata } from "@/lib/seo/metadata";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getContactPageData } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";

export const revalidate = 60;

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

  const kicker = data?.kicker?.[locale] || data?.kicker?.en || "DIRECT TECHNICAL ENGAGEMENT";
  const title = data?.title?.[locale] || data?.title?.en || dict.contact.title;
  const subtitle = data?.subtitle?.[locale] || data?.subtitle?.en || dict.contact.subtitle;

  const contactBlocks = data?.offices?.map((office: any) => {
    const isHQ = office.name?.includes("HEADQUARTERS");
    
    let phoneStr = office.phone || "";
    let phoneLabel = isHQ ? "" : (phoneStr.includes("(International") ? "International / WhatsApp" : "Cairo Office");
    let phoneVal = phoneStr.replace(/\(.*?\)/g, "").trim();

    return {
      name: office.name,
      subtitle: isHQ ? "Nexus Resources" : (office.name?.includes("INVESTORS") ? "Discuss an Opportunity" : "Get in Touch"),
      description: isHQ ? "" : office.address,
      email: office.email,
      phoneLabel: phoneLabel,
      phone: phoneVal,
      addressLines: isHQ ? office.address?.split(", ").map((s: string) => s.trim()) : undefined
    };
  }) || [];

  const heroImageUrl = data?.heroImage ? urlForImage(data.heroImage)?.url() : null;

  return (
    <div className="w-full bg-background">
      {/* 1. Hero: Cinematic Dark Navy Split Banner */}
      <section className="relative min-h-[500px] lg:min-h-[580px] bg-primary-navy-dark text-white flex items-center overflow-hidden border-b border-primary-gold/20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {heroImageUrl ? (
            <Image
              src={heroImageUrl}
              alt={title}
              fill
              className="object-cover object-right md:object-center opacity-40 lg:opacity-65 scale-105 transition-transform duration-1000"
              priority
              sizes="100vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-primary-navy-dark via-primary-navy to-[#050A15]">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:28px_28px]" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-navy-dark via-primary-navy-dark/90 lg:via-primary-navy-dark/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-navy-dark via-transparent to-primary-navy-dark/40" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24">
          <div className="max-w-2xl lg:max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2">
              <span className="font-label text-xs uppercase tracking-[0.2em] text-primary-gold font-bold">
                {kicker}
              </span>
              <span className="h-[1px] w-8 bg-primary-gold" />
            </div>

            <h1 className="font-headline text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.12] tracking-tight text-white font-bold">
              {title}
            </h1>

            {subtitle && (
              <div className="font-body text-body-md sm:text-body-lg text-white/85 leading-relaxed space-y-4 max-w-2xl whitespace-pre-wrap">
                {subtitle}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Main Content: Form & Offices Grid */}
      <section className="py-20 lg:py-24 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Contact Form Component */}
          <div className="lg:col-span-6 bg-white p-8 sm:p-12 border border-surface-container-high rounded-sm shadow-card">
            <div className="space-y-2 mb-8">
              <div className="inline-flex items-center space-x-2 text-primary-gold font-label text-xs uppercase tracking-[0.2em] font-bold">
                <MessageSquare className="w-4 h-4" />
                <span>INQUIRY FORM</span>
              </div>
              <h2 className="font-headline text-2xl sm:text-3xl text-primary-navy font-bold">
                {data?.formHeading?.[locale] || data?.formHeading?.en || "SEND US A MESSAGE"}
              </h2>
              <p className="font-body text-body-md text-on-surface/75">
                {data?.formSubtitle?.[locale] || data?.formSubtitle?.en || "Use the contact form below and our team will respond to your inquiry."}
              </p>
            </div>

            <ContactForm locale={locale} formType="contact" />
            
            {data?.consentText && (
              <p className="mt-6 text-xs text-on-surface/60 italic text-center">
                {data.consentText?.[locale] || data.consentText?.en}
              </p>
            )}
          </div>

          {/* Office Locations & Contact Info */}
          <div className="lg:col-span-6 space-y-8">
            {contactBlocks.map((block: any, idx: number) => (
              <div 
                key={idx} 
                className="p-8 bg-white border border-surface-container-high hover:border-primary-gold/40 rounded-sm shadow-card transition-all duration-300 space-y-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary-gold/10 flex items-center justify-center text-primary-gold flex-shrink-0">
                    <Building className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <div>
                    <h3 className="font-headline text-lg sm:text-xl font-bold text-primary-navy uppercase tracking-wider">
                      {block.name}
                    </h3>
                    {block.subtitle && (
                      <p className="font-label text-xs uppercase tracking-wider text-primary-gold font-bold">
                        {block.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                {block.description && (
                  <p className="font-body text-body-md text-on-surface/75 leading-relaxed pt-2">
                    {block.description}
                  </p>
                )}

                <div className="space-y-3 pt-2 border-t border-surface-container-high">
                  {block.email && (
                    <div className="flex items-center space-x-3 text-body-md text-on-surface/85">
                      <Mail className="w-4 h-4 flex-shrink-0 text-primary-gold" />
                      <span>Email: <strong className="text-primary-navy font-semibold">{block.email}</strong></span>
                    </div>
                  )}

                  {block.phone && (
                    <div className="flex items-center space-x-3 text-body-md text-on-surface/85">
                      <Phone className="w-4 h-4 flex-shrink-0 text-primary-gold" />
                      <span>{block.phoneLabel}: <strong className="text-primary-navy font-semibold">{block.phone}</strong></span>
                    </div>
                  )}

                  {block.addressLines && (
                    <div className="flex items-start space-x-3 text-body-md text-on-surface/85">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-1 text-primary-gold" />
                      <div className="space-y-1">
                        {block.addressLines.map((line: string, i: number) => (
                          <div key={i}>{line}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            <div className="p-8 bg-surface-container-low/60 border border-surface-container-high rounded-sm text-center">
              <p className="font-body text-body-md text-on-surface/80 leading-relaxed font-medium">
                We welcome discussions with international mining companies, investors, project owners, license holders, and strategic partners interested in developing opportunities in Egypt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Closing CTA */}
      {(data?.closingTitle || data?.closingSubtitle) && (
        <section className="py-16 px-6 sm:px-10 lg:px-16 bg-white border-t border-surface-container-high">
          <div className="max-w-[1440px] mx-auto">
            <div className="p-8 sm:p-12 bg-primary-navy-dark text-white rounded-sm border border-primary-gold/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
              <div className="space-y-2">
                <h2 className="font-headline text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {data.closingTitle?.[locale] || data.closingTitle?.en}
                </h2>
                <p className="font-body text-body-md text-white/80 max-w-2xl">
                  {data.closingSubtitle?.[locale] || data.closingSubtitle?.en}
                </p>
              </div>

              {data.closingButtonLabel && (
                <Link
                  href="#top"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary-gold hover:bg-primary-gold-light text-primary-navy font-label text-[13px] uppercase tracking-[0.12em] font-bold rounded-sm shadow-gold-glow transition-all duration-300 group flex-shrink-0"
                >
                  <span>{data.closingButtonLabel?.[locale] || data.closingButtonLabel?.en}</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
