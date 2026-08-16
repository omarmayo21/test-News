import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Users } from "lucide-react";
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

  const ctaTitle = data?.ctaTitle?.[locale] || data?.ctaTitle?.en || "Learn more about Egypt's potential and our long-term vision.";
  const ctaSubtitle =
    data?.ctaSubtitle?.[locale] ||
    data?.ctaSubtitle?.en ||
    "Explore why Egypt is emerging as a significant destination for mineral exploration, development, and mining investment.";
  const ctaButtonLabel = data?.ctaButtonLabel?.[locale] || data?.ctaButtonLabel?.en || "EXPLORE WHY EGYPT →";
  const ctaButtonLink = data?.ctaButtonLink || `/${locale}/why-egypt`;

  const managementTeam = data?.managementTeam || [];
  const advisoryBoard = data?.advisoryBoard || [];
  const specialistConsultants = data?.specialistConsultants || [];

  const renderTeamGrid = (teamMembers: any[]) => {
    if (!teamMembers || teamMembers.length === 0) return null;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member: any, idx: number) => {
          const name = member.name || "Team Member";
          const role = member.role?.[locale] || member.role?.en || member.role || "";
          const bio = member.bio?.[locale] || member.bio?.en || member.bio || "";
          const avatarUrl = member.avatar ? urlForImage(member.avatar)?.url() : null;

          return (
            <div
              key={idx}
              className="p-8 bg-white border border-surface-container-high hover:border-primary-gold/40 rounded-sm shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col items-center text-center group"
            >
              {/* Circular Avatar */}
              <div className="mb-6 relative">
                {avatarUrl ? (
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary-gold shadow-md relative">
                    <Image
                      src={avatarUrl}
                      alt={name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="96px"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full border-2 border-primary-gold/50 bg-surface-container-low flex items-center justify-center text-primary-gold font-headline font-bold text-2xl shadow-inner group-hover:border-primary-gold transition-colors">
                    {getInitials(name)}
                  </div>
                )}
              </div>

              <h3 className="font-headline text-xl text-primary-navy font-bold mb-1.5 group-hover:text-primary-gold transition-colors">
                {name}
              </h3>
              
              {role && (
                <p className="font-label text-xs uppercase tracking-[0.1em] text-primary-gold font-bold mb-4">
                  {role}
                </p>
              )}

              {bio && (
                <p className="font-body text-xs sm:text-[13px] text-on-surface/75 leading-relaxed whitespace-pre-wrap flex-1">
                  {bio}
                </p>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full bg-background">
      {/* 1. Hero: Cinematic Dark Navy Split Banner */}
      <section className="relative min-h-[560px] lg:min-h-[640px] bg-primary-navy-dark text-white flex items-center overflow-hidden border-b border-primary-gold/20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/logo/desert-landscape.jpg"
            alt={title}
            fill
            className="object-cover object-right md:object-center opacity-40 lg:opacity-70 scale-105 transition-transform duration-1000"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-navy-dark via-primary-navy-dark/90 lg:via-primary-navy-dark/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-navy-dark via-transparent to-primary-navy-dark/40" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-24">
          <div className="max-w-2xl lg:max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2">
              <span className="font-label text-xs uppercase tracking-[0.2em] text-primary-gold font-bold">
                CORPORATE
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

      {/* 2. Management Team */}
      {managementTeam.length > 0 && (
        <section id="leadership-team" className="py-20 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto space-y-12 scroll-mt-24">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center space-x-4">
              <span className="h-[1px] w-12 bg-primary-gold" />
              <h2 className="font-headline text-2xl sm:text-3xl text-primary-navy font-bold uppercase tracking-wider">
                MANAGEMENT TEAM
              </h2>
              <span className="h-[1px] w-12 bg-primary-gold" />
            </div>
            <p className="font-body text-body-md sm:text-body-lg text-primary-gold font-semibold">
              {data?.managementTeamSubtitle?.[locale] || data?.managementTeamSubtitle?.en || "Building the Company. Leading the Projects."}
            </p>
          </div>
          {renderTeamGrid(managementTeam)}
        </section>
      )}

      {/* 3. Advisory Board */}
      {advisoryBoard.length > 0 && (
        <section id="advisory-board" className="py-20 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto space-y-12 border-t border-surface-container-high scroll-mt-24">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center space-x-4">
              <span className="h-[1px] w-12 bg-primary-gold" />
              <h2 className="font-headline text-2xl sm:text-3xl text-primary-navy font-bold uppercase tracking-wider">
                ADVISORY BOARD
              </h2>
              <span className="h-[1px] w-12 bg-primary-gold" />
            </div>
            <p className="font-body text-body-md sm:text-body-lg text-primary-gold font-semibold">
              {data?.advisoryBoardSubtitle?.[locale] || data?.advisoryBoardSubtitle?.en || "Specialist Expertise Supporting Project Development"}
            </p>
            {data?.advisoryBoardDescription && (
              <p className="font-body text-body-md text-on-surface/75 leading-relaxed">
                {data.advisoryBoardDescription?.[locale] || data.advisoryBoardDescription?.en}
              </p>
            )}
          </div>
          {renderTeamGrid(advisoryBoard)}
        </section>
      )}

      {/* 4. Specialist Consultants */}
      {specialistConsultants.length > 0 && (
        <section className="py-20 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto space-y-12 border-t border-surface-container-high scroll-mt-24">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center space-x-4">
              <span className="h-[1px] w-12 bg-primary-gold" />
              <h2 className="font-headline text-2xl sm:text-3xl text-primary-navy font-bold uppercase tracking-wider">
                SPECIALIST CONSULTANTS
              </h2>
              <span className="h-[1px] w-12 bg-primary-gold" />
            </div>
            <p className="font-body text-body-md sm:text-body-lg text-primary-gold font-semibold">
              {data?.specialistConsultantsSubtitle?.[locale] || data?.specialistConsultantsSubtitle?.en || "Specialist Expertise. Independent Capability."}
            </p>
            {data?.specialistConsultantsDescription && (
              <p className="font-body text-body-md text-on-surface/75 leading-relaxed">
                {data.specialistConsultantsDescription?.[locale] || data.specialistConsultantsDescription?.en}
              </p>
            )}
          </div>
          {renderTeamGrid(specialistConsultants)}
        </section>
      )}

      {/* 5. Integrated Expertise Bar from scr pag */}
      <section className="py-12 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto">
        <div className="p-8 sm:p-10 bg-surface-container-low/70 border border-surface-container-high rounded-sm shadow-card flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="w-16 h-16 rounded-full border-2 border-primary-gold/40 bg-white flex items-center justify-center text-primary-gold flex-shrink-0 shadow-sm">
            <Users className="w-8 h-8 stroke-[1.75]" />
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="font-headline text-xl sm:text-2xl text-primary-navy font-bold">
              {data?.integratedExpertiseTitle?.[locale] || data?.integratedExpertiseTitle?.en || "One Team. Multiple Disciplines."}
            </h3>
            <p className="font-body text-sm sm:text-base text-on-surface/80 leading-relaxed font-medium">
              {data?.integratedExpertiseDisciplines?.[locale] || data?.integratedExpertiseDisciplines?.en || "Leadership • Mining • Geology • Mineral Processing • Engineering • Technology • Business Development • Stakeholder Relations"}
            </p>
          </div>
        </div>
      </section>

      {/* 6. Closing Inset CTA Banner from scr pag */}
      <section className="py-16 px-6 sm:px-10 lg:px-16 bg-white border-t border-surface-container-high">
        <div className="max-w-[1440px] mx-auto">
          <div className="p-8 sm:p-12 bg-primary-navy-dark text-white rounded-sm border border-primary-gold/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-6 text-center lg:text-left">
              <div className="hidden sm:flex w-16 h-16 rounded-full border-2 border-primary-gold/50 bg-white/5 items-center justify-center text-primary-gold flex-shrink-0">
                <Compass className="w-8 h-8 stroke-[1.75]" />
              </div>
              <div className="space-y-2">
                <h3 className="font-headline text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {ctaTitle}
                </h3>
                <p className="font-body text-body-md text-white/80 max-w-xl">
                  {ctaSubtitle}
                </p>
              </div>
            </div>

            <Link
              href={ctaButtonLink}
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-gold hover:bg-primary-gold-light text-primary-navy font-label text-[13px] uppercase tracking-[0.12em] font-bold rounded-sm shadow-gold-glow transition-all duration-300 group flex-shrink-0"
            >
              <span>{ctaButtonLabel}</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
