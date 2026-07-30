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
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCpy1Um9NwhUGEsMkB4jzFg5GX1jjViJxSfiBHiNZiOGY25CTcPUhY0mQZ3F-IB6mXIihNeVTWxO3N5fqSKPCcjoyOLbumWIg2McvhKn0jEspvHs-avXi2kvtDxRlifUqbs7jiWSa_hzxtnIO_mlBPIEyXMTQ_27ynF0Nbi5vOPxaDa2bZB7hgPa2vh3ssChe2kPjlO1XHEdMh4u25ZmaLaMdTgNeY76WCiNCdYdHGCjlD8Cn8_spjl4R3i9HQlxClcxeu-g9L56IC",
    },
    {
      name: "Eng. Sarah Mansour",
      role: "Head of Structural Infrastructure",
      bio: "Master of Civil Engineering with specialized expertise in deep underground tunnel stabilization, slope safety, and processing plant infrastructure.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_raxG9n-LtRD_UiXztE5ChPc4obDFJhh8tIA25nI4mGc618f71KF0OUtGVszoZofpUu1yO5nn19c-eubyJ3uNfH8TtsHB3qZSV8TIwb14NdquLHQbC9y_31YrOQdO3Fe47szIS_VWR_rGd-K1xRTD29uO2gVMEssFb9QBIrWOX_GuHjh7A-3bUTaHIzz2J4IBOH3gwSjN38Spr_euaIJJsVR-ts1SEfdDjhCcRaSq9tMPKbov8FVazPk5mEzb-g9LgEvaFQ1ZnNc6",
    },
    {
      name: "Karim Benjelloun",
      role: "Vice President of Operational Management",
      bio: "Former Operations Director for multinational mining concessions, overseeing open-pit extraction efficiency and autonomous logistics integration.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTBbbPEjmBrXy6iL_Br-AMCocJMeLUmFbaV7Bx0c7ZtSbllcxcjO7gFhGINNAW0bBzuyG64Q0xBy2fSZ42pAxupjo_KBm6ipJJgoJkPRj1f1S572DpIcnz5mHuaRndSB4EMcENosnCA0u_AQgfhQWK2Qj2gmeVIm9EAIT2Sc5azekQxu3dwLba67U64PxzmhvnSW8yrT8C10SfSsY6LY3EqlZ2Oaci1hmJc5fnfZwooVyJ91JWozWC-8LB7THAo-Gv7M4",
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
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-center grayscale-[20%]"
              />
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
