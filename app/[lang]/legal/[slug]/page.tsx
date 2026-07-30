import React from "react";
import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";
import { Locale } from "@/i18n-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = (lang as Locale) || "en";
  const title = slug === "privacy-policy" ? "Privacy Policy - Nexus Resources" : "Terms of Service - Nexus Resources";

  return constructMetadata({
    title,
    description: "Official legal and compliance policies of Nexus Resources.",
    locale,
    path: `/legal/${slug}`,
  });
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const isPrivacy = slug === "privacy-policy";

  return (
    <div className="py-section-padding px-margin-mobile md:px-section-padding max-w-4xl mx-auto">
      <h1 className="font-headline font-headline-lg text-headline-lg text-primary-navy mb-8">
        {isPrivacy ? "Privacy Policy" : "Terms of Service"}
      </h1>

      <div className="font-body text-body-lg text-on-surface space-y-6 leading-relaxed opacity-90">
        <p>
          Last updated: January 2026
        </p>

        {isPrivacy ? (
          <>
            <p>
              Nexus Resources (&quot;Nexus&quot;, &quot;we&quot;, &quot;our&quot;) is committed to protecting the privacy and confidentiality of corporate partners, investors, and website visitors. This Privacy Policy outlines our procedures regarding data collection, processing, and storage.
            </p>

            <h3 className="font-headline text-2xl text-primary-navy pt-4">
              1. Information We Collect
            </h3>
            <p>
              We collect information provided directly through forms, such as full name, corporate email address, telephone number, and inquiry messages. Technical diagnostic data, including IP address, browser type, and cookie consent preferences, are collected for site performance optimization and security compliance.
            </p>

            <h3 className="font-headline text-2xl text-primary-navy pt-4">
              2. Data Protection & Regulatory Compliance
            </h3>
            <p>
              Your personal data is encrypted during transmission using TLS/SSL protocols. We do not sell or monetize personal or corporate data under any circumstances. Data access is strictly restricted to authorized engineering and technical staff.
            </p>
          </>
        ) : (
          <>
            <p>
              Welcome to the official website of Nexus Resources. By accessing or using this website, you agree to comply with and be bound by these Terms of Service.
            </p>

            <h3 className="font-headline text-2xl text-primary-navy pt-4">
              1. Intellectual Property
            </h3>
            <p>
              All content, including structural engineering reports, geological maps, photos, logos, trademarks, and code, is the exclusive property of Nexus Resources and is protected under international intellectual property laws.
            </p>

            <h3 className="font-headline text-2xl text-primary-navy pt-4">
              2. Disclaimer of Technical Reports
            </h3>
            <p>
              Information on this website is for general informational purposes. Exploration geological metrics and resource estimates are subject to pre-feasibility updates and technical revisions.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
