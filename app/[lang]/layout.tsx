import React from "react";
import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";
import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/lib/seo/json-ld";
import { getSiteSettings } from "@/lib/sanity/queries";
import { Locale } from "@/i18n-config";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexus Resources - Engineering the Future of Egyptian Mining",
  description: "Delivering structural excellence and strategic resource management through precision engineering and sustainable practices in the Arabian-Nubian shield.",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang as Locale) || "en";
  const siteSettings = await getSiteSettings();

  return (
    <html lang={locale} className={`${inter.variable} ${sourceSerif.variable}`}>
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd locale={locale} />
      </head>
      <body className="bg-background text-on-surface font-body text-body-md antialiased min-h-screen flex flex-col justify-between overflow-x-hidden">
        <AnalyticsProvider
          gaId={siteSettings?.gaMeasurementId}
          gtmId={siteSettings?.gtmContainerId}
          metaPixelId={siteSettings?.metaPixelId}
          googleVerification={siteSettings?.googleSearchConsoleVerification}
          bingVerification={siteSettings?.bingVerificationToken}
          yandexVerification={siteSettings?.yandexVerificationToken}
          fbDomainVerification={siteSettings?.facebookDomainVerificationToken}
          customHeadScripts={siteSettings?.customHeadScripts}
          customBodyScripts={siteSettings?.customBodyScripts}
          cookieConsentEnabled={siteSettings?.enableCookieConsent ?? true}
        />
        <Header locale={locale} />
        <PageTransition>{children}</PageTransition>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
