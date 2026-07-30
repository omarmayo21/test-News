import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
    title: "Why Egypt — Strategic Advantages of the Arabian-Nubian Shield",
    description: "Explore the geological potential, infrastructure readiness, and competitive investment framework of Egypt's Eastern Desert mining sector.",
    locale,
    path: "/why-egypt",
  });
}

export default async function WhyEgyptPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang as Locale) || "en";
  const dict = getDictionary(locale);

  return (
    <div className="py-section-padding px-margin-mobile md:px-section-padding max-w-container-max mx-auto space-y-20">
      {/* Hero Header */}
      <div className="max-w-3xl">
        <span className="font-label text-label-md text-primary-gold uppercase tracking-widest block mb-4">
          Strategic Landscape
        </span>
        <h1 className="font-headline font-headline-lg text-headline-lg text-primary-navy mb-6">
          Unlocking the Arabian-Nubian Shield
        </h1>
        <p className="font-body text-body-lg text-on-surface opacity-85 leading-relaxed">
          The Arabian-Nubian Shield (ANS) represents one of the world&apos;s last remaining under-explored mineral frontiers. Modern structural engineering and targeted geophysical exploration position Egypt as the premier investment hub for gold, copper, and critical green-transition minerals.
        </p>
      </div>

      {/* Stats Counter Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter bg-surface-container-low p-10 border-l-4 border-primary-gold">
        <div>
          <div className="font-headline text-display-lg text-primary-navy mb-1">1.2M</div>
          <div className="font-label text-label-md text-primary-gold uppercase tracking-wider font-bold">Ounces Discovered</div>
        </div>
        <div>
          <div className="font-headline text-display-lg text-primary-navy mb-1">40+</div>
          <div className="font-label text-label-md text-primary-gold uppercase tracking-wider font-bold">Active Concessions</div>
        </div>
        <div>
          <div className="font-headline text-display-lg text-primary-navy mb-1">$1.5B+</div>
          <div className="font-label text-label-md text-primary-gold uppercase tracking-wider font-bold">Sector Investment</div>
        </div>
        <div>
          <div className="font-headline text-display-lg text-primary-navy mb-1">6,000 km</div>
          <div className="font-label text-label-md text-primary-gold uppercase tracking-wider font-bold">Road Infrastructure</div>
        </div>
      </div>

      {/* Deep-Dive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="font-headline text-headline-lg text-primary-navy">
            World-Class Infrastructure & Port Access
          </h2>
          <p className="font-body text-body-md opacity-80 leading-relaxed">
            Egypt boasts direct access to the Red Sea ports of Safaga and Hamrawein, connecting extraction sites to international shipping lanes within hours. Newly constructed paved highways provide continuous transport capability across the Eastern Desert.
          </p>
          <ul className="space-y-3 font-body text-body-md opacity-90">
            <li className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-primary-gold" />
              <span>Modernized Red Sea Deepwater Ports</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-primary-gold" />
              <span>High-Voltage National Grid Connection</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-primary-gold" />
              <span>Streamlined Mining Law Regulatory Framework</span>
            </li>
          </ul>
        </div>
        <div className="relative h-[400px] border-4 border-white shadow-xl overflow-hidden bg-surface-container-high">
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-8 border-t border-surface-container-high">
        <Link
          href={`/${locale}/contact`}
          className="inline-block px-10 py-5 bg-primary-gold text-white font-label text-label-md uppercase tracking-widest hover:bg-primary-navy transition-colors"
        >
          Request Exploration Report
        </Link>
      </div>
    </div>
  );
}
