import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "dark" | "light";
  size?: "header" | "footer" | "custom";
  className?: string;
  href?: string;
}

export function Logo({
  variant = "light",
  size = "header",
  className = "",
  href = "/",
}: LogoProps) {
  const logoSrc = variant === "dark" ? "/logo/D- Reverse copy.svg" : "/logo/Original.svg";

  // Slightly enlarged logo container for prominent luxury presentation
  const containerClasses =
    size === "header"
      ? "w-[150px] h-[40px] sm:w-[190px] sm:h-[48px] md:w-[230px] md:h-[54px] lg:w-[220px] lg:h-[50px]"
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
