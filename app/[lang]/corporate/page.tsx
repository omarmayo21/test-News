import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getTeamPageData } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = (lang as Locale) || "en";
  return constructMetadata({
    title: "Consultant Team & Executive Advisory - Nexus Resources",
    description: "Meet the world-class geological engineers, structural architects, and operational leaders driving Nexus Resources forward.",
    locale,
    path: "/team",
  });
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

  const title = data?.title?.[locale] || data?.title?.en || "Consultant Team & Leadership";
  const subtitle = data?.subtitle?.[locale] || data?.subtitle?.en || "Our senior team combines decades of international geological authority, structural engineering mastery, and operational oversight.";
  
  const ctaTitle = data?.ctaTitle?.[locale] || data?.ctaTitle?.en || "Want to join our senior engineering team?";
  const ctaSubtitle = data?.ctaSubtitle?.[locale] || data?.ctaSubtitle?.en || "We are continuously recruiting senior geologists, mining engineers, and environmental consultants.";
  const ctaButtonLabel = data?.ctaButtonLabel?.[locale] || data?.ctaButtonLabel?.en || "Contact Advisory Board";
  const ctaButtonLink = data?.ctaButtonLink || `/${locale}/contact`;

  const managementTeam = data?.managementTeam || [];
  const advisoryBoard = data?.advisoryBoard || [];
  const specialistConsultants = data?.specialistConsultants || [];

  const renderTeamGrid = (teamMembers: any[]) => {
    if (!teamMembers || teamMembers.length === 0) return null;
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-20">
        {teamMembers.map((member: any, idx: number) => (
          <div
            key={idx}
            className="bg-surface-container-low border-b-2 border-primary-gold overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="relative h-72 w-full bg-surface-container-high">
              {member.avatar && urlForImage(member.avatar) && (
                <Image
                  src={urlForImage(member.avatar)!.url()}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 grayscale-[20%]"
                  sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}
            </div>
            <div className="p-8 flex-1">
              <h3 className="font-headline text-headline-sm text-primary-navy mb-1">
                {member.name}
              </h3>
              <p className="font-label text-xs uppercase tracking-wider text-primary-gold font-bold mb-4">
                {member.role?.[locale] || member.role?.en}
              </p>
              <p className="font-body text-body-md opacity-75 leading-relaxed">
                {member.bio?.[locale] || member.bio?.en}
              </p>
            </div>
          </div>
        ))}
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
        <p className="font-body text-body-lg text-on-surface opacity-80">
          {subtitle}
        </p>
      </div>

      {/* Management Team Grid */}
      {managementTeam.length > 0 && (
        <div className="mb-12">
          <h2 className="font-headline text-headline-md text-primary-navy mb-8 border-b-2 border-primary-gold inline-block pb-2">Management Team</h2>
          {renderTeamGrid(managementTeam)}
        </div>
      )}

      {/* Advisory Board Grid */}
      {advisoryBoard.length > 0 && (
        <div className="mb-12">
          <h2 className="font-headline text-headline-md text-primary-navy mb-8 border-b-2 border-primary-gold inline-block pb-2">Advisory Board</h2>
          {renderTeamGrid(advisoryBoard)}
        </div>
      )}

      {/* Specialist Consultants Grid */}
      {specialistConsultants.length > 0 && (
        <div className="mb-12">
          <h2 className="font-headline text-headline-md text-primary-navy mb-8 border-b-2 border-primary-gold inline-block pb-2">Specialist Consultants</h2>
          {renderTeamGrid(specialistConsultants)}
        </div>
      )}

      {/* Advisory CTA */}
      <div className="text-center p-12 bg-white border border-surface-container-high">
        <h3 className="font-headline text-headline-md text-primary-navy mb-4">
          {ctaTitle}
        </h3>
        <p className="font-body text-body-md opacity-80 mb-6 max-w-xl mx-auto">
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
