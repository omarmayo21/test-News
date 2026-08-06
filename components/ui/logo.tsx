import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/lib/sanity/image";

interface LogoProps {
  variant?: "dark" | "light";
  size?: "header" | "footer" | "custom";
  className?: string;
  href?: string;
  themeSettings?: any;
  headerLogo?: any;
}

export function Logo({
  variant = "light",
  size = "header",
  className = "",
  href = "/",
  themeSettings,
  headerLogo,
}: LogoProps) {
  // Determine source from Sanity, falling back to local SVGs
  let logoSrc = variant === "dark" ? "/logo/D- Reverse copy.svg" : "/logo/Original.svg";

  if (size === "header" && headerLogo) {
    logoSrc = urlForImage(headerLogo)?.url() || logoSrc;
  } else if (themeSettings) {
    if (variant === "dark" && themeSettings.darkLogo) {
      logoSrc = urlForImage(themeSettings.darkLogo)?.url() || logoSrc;
    } else if (variant === "light" && themeSettings.lightLogo) {
      logoSrc = urlForImage(themeSettings.lightLogo)?.url() || logoSrc;
    }
  }

  // Slightly enlarged logo container for prominent luxury presentation
  const containerClasses =
    size === "header"
      ? "w-[130px] h-[34px] sm:w-[160px] sm:h-[40px] md:w-[190px] md:h-[46px] lg:w-[180px] lg:h-[42px]"
      : size === "footer"
        ? "w-[200px] h-[50px] md:w-[260px] md:h-[60px]"
        : "w-[180px] h-[46px]";

  return (
    <Link href={href} className={`inline-block flex-shrink-0 group ${className}`}>
      <div className={`relative ${containerClasses} transition-transform duration-300 group-hover:scale-[1.02]`}>
        <Image
          src={logoSrc}
          alt="Nexus Resources Logo"
          fill
          className="object-contain object-left"
          unoptimized
          sizes={size === "footer" ? "260px" : "230px"}
        />
      </div>
    </Link>
  );
}
