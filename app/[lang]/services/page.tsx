import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Compass, Layers, Cpu, ShieldCheck, BarChart3, Wrench } from "lucide-react";
import { constructMetadata } from "@/lib/seo/metadata";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = (lang as Locale) || "en";
  return constructMetadata({
    title: "Services & Structural Expertise - Nexus Resources",
    description: "Discover our comprehensive suite of mining infrastructure design, geological resource estimation, and operational management services.",
    locale,
    path: "/services",
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang as Locale) || "en";
  const dict = getDictionary(locale);

  const services = [
    {
      icon: Compass,
      title: "Structural Engineering & Mine Infrastructure",
      description: "Custom design and engineering of extraction facilities, slope stability analysis, underground tunneling, and heavy processing plant infrastructure built to withstand severe desert conditions.",
    },
    {
      icon: Layers,
      title: "Geological Resource Exploration & Modeling",
      description: "State-of-the-art geospatial modeling, 3D subsurface deposit visualization, diamond core drilling supervision, and QA/QC analytical resource estimation for pre-feasibility reports.",
    },
    {
      icon: Cpu,
      title: "Operational Workflow Optimization",
      description: "Optimizing material flow, autonomous haulage dispatch systems, crushing plant energy efficiency, and safety compliance across remote mining sites.",
    },
    {
      icon: ShieldCheck,
      title: "Environmental & Sustainable Rehabilitation",
      description: "Water conservation engineering, solar power integration for remote mining camps, tailings management, and post-extraction land reclamation plans.",
    },
    {
      icon: BarChart3,
      title: "Feasibility & Technical Advisory",
      description: "Independent bankable feasibility studies (BFS), Competent Person Reports (CPR), asset valuation, and regulatory compliance consulting in accordance with Egyptian mining law.",
    },
    {
      icon: Wrench,
      title: "Equipment Maintenance & Logistics Engineering",
      description: "Fleet telemetry management, predictive machinery maintenance, heavy equipment supply chain logistics, and remote site maintenance workshops.",
    },
  ];

  return (
    <div className="py-section-padding px-margin-mobile md:px-section-padding max-w-container-max mx-auto">
      {/* Page Header */}
      <div className="max-w-3xl mb-16">
        <h1 className="font-headline font-headline-lg text-headline-lg text-primary-navy mb-6">
          {dict.nav.expertise} & Services
        </h1>
        <p className="font-body text-body-lg text-on-surface opacity-80">
          Delivering end-to-end structural engineering, geological resource assessment, and operational management across Egypt and the broader region.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mb-20">
        {services.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="p-8 bg-surface-container-low border-t-2 border-primary-gold hover:shadow-xl transition-all duration-300 group"
            >
              <div className="mb-6 text-primary-gold transition-transform group-hover:scale-110 duration-300">
                <Icon className="w-10 h-10" />
              </div>
              <h3 className="font-headline font-headline-sm text-headline-sm text-primary-navy mb-4">
                {s.title}
              </h3>
              <p className="font-body text-body-md text-on-surface opacity-75">
                {s.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div className="p-12 bg-primary-navy text-white text-center rounded-sm">
        <h3 className="font-headline text-headline-md text-white mb-4">
          Need a Custom Engineering Feasibility Study?
        </h3>
        <p className="font-body text-body-lg opacity-80 mb-8 max-w-2xl mx-auto">
          Contact our senior geological and structural engineers to evaluate your project site in the Eastern Desert.
        </p>
        <Link
          href={`/${locale}/contact`}
          className="inline-block px-8 py-4 bg-primary-gold text-white font-label text-label-md uppercase tracking-widest hover:bg-white hover:text-primary-navy transition-colors"
        >
          {dict.nav.contact}
        </Link>
      </div>
    </div>
  );
}
