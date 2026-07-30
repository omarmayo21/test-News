import React from "react";
import { AnalyticsLoader } from "./analytics-loader";

interface AnalyticsProviderProps {
  gaId?: string;
  gtmId?: string;
  metaPixelId?: string;
  tiktokPixelId?: string;
  linkedinInsightTagId?: string;
  microsoftClarityId?: string;
  googleVerification?: string;
  bingVerification?: string;
  yandexVerification?: string;
  fbDomainVerification?: string;
  customHeadScripts?: string;
  customBodyScripts?: string;
  cookieConsentEnabled?: boolean;
}

export function AnalyticsProvider({
  gaId,
  gtmId,
  metaPixelId,
  tiktokPixelId,
  linkedinInsightTagId,
  microsoftClarityId,
  googleVerification,
  bingVerification,
  yandexVerification,
  fbDomainVerification,
  customHeadScripts,
  customBodyScripts,
  cookieConsentEnabled = true,
}: AnalyticsProviderProps) {
  return (
    <>
      {/* Search Engine Site Verifications */}
      {googleVerification && (
        <meta name="google-site-verification" content={googleVerification} />
      )}
      {bingVerification && (
        <meta name="msvalidate.01" content={bingVerification} />
      )}
      {yandexVerification && <meta name="yandex-verification" content={yandexVerification} />}
      {fbDomainVerification && <meta name="facebook-domain-verification" content={fbDomainVerification} />}

      {/* Custom Head Scripts from Sanity */}
      {customHeadScripts && (
        <div dangerouslySetInnerHTML={{ __html: customHeadScripts }} />
      )}

      {/* Custom Body Scripts from Sanity */}
      {customBodyScripts && (
        <div dangerouslySetInnerHTML={{ __html: customBodyScripts }} />
      )}

      <AnalyticsLoader
        gaId={gaId}
        gtmId={gtmId}
        metaPixelId={metaPixelId}
        tiktokPixelId={tiktokPixelId}
        linkedinInsightTagId={linkedinInsightTagId}
        microsoftClarityId={microsoftClarityId}
        cookieConsentEnabled={cookieConsentEnabled}
      />
    </>
  );
}
