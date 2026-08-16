import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getTeamPageData } from "@/lib/sanity/queries";
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
    title: "The People Behind Nexus — Corporate & Advisory",
    description: "Meet the experienced leadership, executive advisors, and specialist consultants guiding Nexus Resources.",
    locale,
    path: "/corporate",
  });
}

function getInitials(name: string): string {
  const clean = name.replace(/^(Mr\.|Eng\.|Dr\.|Geo\.|Chem\.|General)\s+/i, "");
  const parts = clean.split(" ").filter(Boolean);
  if (parts.length === 0) return "NR";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang as Locale) || "en";
  const dict = getDictionary(locale);
  const data = await getTeamPageData();

  const title = data?.title?.[locale] || data?.title?.en || "The People Behind Nexus";
  const subtitle =
    data?.subtitle?.[locale] ||
    data?.subtitle?.en ||
    "Leadership. Expertise. Execution.\n\nNexus Resources brings together experienced leadership and specialist expertise across mining, geology, engineering, mineral processing, business development, technology, finance, and stakeholder relations.\n\nOur corporate structure combines executive management, experienced advisors, and specialist consultants to support the evaluation, development, and operation of mining projects.";

  const ctaTitle = data?.ctaTitle?.[locale] || data?.ctaTitle?.en || "Discover the Opportunity";
  const ctaSubtitle =
    data?.ctaSubtitle?.[locale] ||
    data?.ctaSubtitle?.en ||
    "Explore why Egypt is emerging as a significant destination for mineral exploration, development, and mining investment.";
  const ctaButtonLabel = data?.ctaButtonLabel?.[locale] || data?.ctaButtonLabel?.en || "Explore Why Egypt →";
  const ctaButtonLink = data?.ctaButtonLink || `/${locale}/why-egypt`;

  const managementTeam = data?.managementTeam || [];
  const advisoryBoard = data?.advisoryBoard || [];
  const specialistConsultants = data?.specialistConsultants || [];

  const renderTeamGrid = (teamMembers: any[]) => {
    if (!teamMembers || teamMembers.length === 0) return null;
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-20">
        {teamMembers.map((member: any, idx: number) => {
          const name = member.name || "Team Member";
          const role = member.role?.[locale] || member.role?.en || member.role || "";
          const bio = member.bio?.[locale] || member.bio?.en || member.bio || "";
          const avatarUrl = member.avatar ? urlForImage(member.avatar)?.url() : null;

          return (
            <div
              key={idx}
              className="bg-surface-container-low border-b-2 border-primary-gold overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {avatarUrl ? (
                <div className="relative h-72 w-full bg-surface-container-high">
                  <Image
                    src={avatarUrl}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 grayscale-[20%]"
                    sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className="h-44 w-full bg-gradient-to-br from-primary-navy via-primary-navy/90 to-primary-navy/80 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="w-20 h-20 rounded-full border-2 border-primary-gold/40 flex items-center justify-center text-primary-gold font-headline text-headline-md tracking-wider shadow-inner">
                    {getInitials(name)}
                  </div>
                </div>
              )}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-headline text-headline-sm text-primary-navy mb-1">
                    {name}
                  </h3>
                  {role && (
                    <p className="font-label text-xs uppercase tracking-wider text-primary-gold font-bold mb-4">
                      {role}
                    </p>
                  )}
                  {bio && (
                    <p className="font-body text-body-md opacity-75 leading-relaxed whitespace-pre-wrap">
                      {bio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="py-section-padding px-margin-mobile md:px-section-padding max-w-container-max mx-auto">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <h1 className="font-headline font-headline-lg text-headline-lg text-primary-navy mb-6">
          {title}
        </h1>
        <p className="font-body text-body-lg text-on-surface opacity-80 leading-relaxed whitespace-pre-wrap">
          {subtitle}
        </p>
      </div>

      {/* Management Team Grid */}
      {managementTeam.length > 0 && (
        <div id="leadership-team" className="mb-12 scroll-mt-24">
          <h2 className="font-headline text-headline-md text-primary-navy mb-8 border-b-2 border-primary-gold inline-block pb-2">
            MANAGEMENT TEAM
          </h2>
          {renderTeamGrid(managementTeam)}
        </div>
      )}

      {/* Advisory Board Grid */}
      {advisoryBoard.length > 0 && (
        <div id="advisory-board" className="mb-12 scroll-mt-24">
          <h2 className="font-headline text-headline-md text-primary-navy mb-8 border-b-2 border-primary-gold inline-block pb-2">
            ADVISORY BOARD
          </h2>
          {renderTeamGrid(advisoryBoard)}
        </div>
      )}

      {/* Specialist Consultants Grid */}
      {specialistConsultants.length > 0 && (
        <div className="mb-12 scroll-mt-24">
          <h2 className="font-headline text-headline-md text-primary-navy mb-8 border-b-2 border-primary-gold inline-block pb-2">
            SPECIALIST CONSULTANTS
          </h2>
          {renderTeamGrid(specialistConsultants)}
        </div>
      )}

      {/* Integrated Expertise Section */}
      {data?.integratedExpertiseTitle && (
        <div className="mb-16 text-center max-w-4xl mx-auto py-12 border-y border-surface-container-high">
          <h2 className="font-headline text-headline-md text-primary-navy mb-4 uppercase">
            {data.integratedExpertiseTitle?.[locale] || data.integratedExpertiseTitle?.en}
          </h2>
          {data.integratedExpertiseSubtitle && (
            <p className="font-body text-body-lg text-primary-gold font-bold uppercase tracking-wider mb-6">
              {data.integratedExpertiseSubtitle?.[locale] || data.integratedExpertiseSubtitle?.en}
            </p>
          )}
          {data.integratedExpertiseDisciplines && (
            <p className="font-body text-body-md text-on-surface opacity-80 leading-relaxed font-medium">
              {data.integratedExpertiseDisciplines?.[locale] || data.integratedExpertiseDisciplines?.en}
            </p>
          )}
        </div>
      )}

      {/* Advisory CTA */}
      <div className="text-center p-12 bg-white border border-surface-container-high">
        <h3 className="font-headline text-headline-md text-primary-navy mb-4">
          {ctaTitle}
        </h3>
        <p className="font-body text-body-md opacity-80 mb-6 max-w-xl mx-auto whitespace-pre-wrap">
          {ctaSubtitle}
        </p>
        <Link
          href={ctaButtonLink}
          className="inline-block px-8 py-4 bg-primary-navy text-white font-label text-label-md uppercase tracking-widest hover:bg-primary-gold transition-colors"
        >
          {ctaButtonLabel}
        </Link>
      </div>
    </div>
  );
}
