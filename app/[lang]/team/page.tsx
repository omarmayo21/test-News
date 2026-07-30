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

  const team = [
    {
      name: "Dr. Tarek Al-Sayed",
      role: "Chief Executive & Geological Director",
      bio: "Ph.D. in Structural Geology from Imperial College London with 25+ years directing gold exploration and feasibility across North Africa and the Middle East.",
      image: null,
    },
    {
      name: "Eng. Sarah Mansour",
      role: "Head of Structural Infrastructure",
      bio: "Master of Civil Engineering with specialized expertise in deep underground tunnel stabilization, slope safety, and processing plant infrastructure.",
      image: null,
    },
    {
      name: "Karim Benjelloun",
      role: "Vice President of Operational Management",
      bio: "Former Operations Director for multinational mining concessions, overseeing open-pit extraction efficiency and autonomous logistics integration.",
      image: null,
    },
  ];

  return (
    <div className="py-section-padding px-margin-mobile md:px-section-padding max-w-container-max mx-auto">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <h1 className="font-headline font-headline-lg text-headline-lg text-primary-navy mb-6">
          Consultant Team & Leadership
        </h1>
        <p className="font-body text-body-lg text-on-surface opacity-80">
          Our senior team combines decades of international geological authority, structural engineering mastery, and operational oversight.
        </p>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-20">
        {team.map((member, idx) => (
          <div
            key={idx}
            className="bg-surface-container-low border-b-2 border-primary-gold overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-72 w-full">
              {member.image && (
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 grayscale-[20%]"
                  sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              )}
            </div>
            <div className="p-8">
              <h3 className="font-headline text-headline-sm text-primary-navy mb-1">
                {member.name}
              </h3>
              <p className="font-label text-xs uppercase tracking-wider text-primary-gold font-bold mb-4">
                {member.role}
              </p>
              <p className="font-body text-body-md opacity-75 leading-relaxed">
                {member.bio}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Advisory CTA */}
      <div className="text-center p-12 bg-white border border-surface-container-high">
        <h3 className="font-headline text-headline-md text-primary-navy mb-4">
          Want to join our senior engineering team?
        </h3>
        <p className="font-body text-body-md opacity-80 mb-6 max-w-xl mx-auto">
          We are continuously recruiting senior geologists, mining engineers, and environmental consultants.
        </p>
        <Link
          href={`/${locale}/contact`}
          className="inline-block px-8 py-4 bg-primary-navy text-white font-label text-label-md uppercase tracking-widest hover:bg-primary-gold transition-colors"
        >
          Contact Advisory Board
        </Link>
      </div>
    </div>
  );
}
