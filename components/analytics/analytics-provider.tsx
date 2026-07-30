"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";

interface AnalyticsProviderProps {
  gaId?: string;
  gtmId?: string;
  metaPixelId?: string;
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
  googleVerification,
  bingVerification,
  yandexVerification,
  fbDomainVerification,
  customHeadScripts,
  customBodyScripts,
  cookieConsentEnabled = true,
}: AnalyticsProviderProps) {
  const [cookieAccepted, setCookieAccepted] = useState<boolean | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("nexus_cookie_consent");
    if (saved) {
      setCookieAccepted(saved === "accepted");
    } else {
      setCookieAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("nexus_cookie_consent", "accepted");
    setCookieAccepted(true);
  };

  const handleReject = () => {
    localStorage.setItem("nexus_cookie_consent", "rejected");
    setCookieAccepted(false);
  };

  const activeGaId = gaId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const activeGtmId = gtmId || process.env.NEXT_PUBLIC_GTM_ID;
  const activeMetaPixelId = metaPixelId || process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <>
      {/* Search Engine Site Verifications */}
      {(googleVerification || process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION) && (
        <meta
          name="google-site-verification"
          content={googleVerification || process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
        />
      )}
      {(bingVerification || process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION) && (
        <meta
          name="msvalidate.01"
          content={bingVerification || process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION}
        />
      )}
      {yandexVerification && <meta name="yandex-verification" content={yandexVerification} />}
      {fbDomainVerification && <meta name="facebook-domain-verification" content={fbDomainVerification} />}

      {/* Google Analytics 4 */}
      {activeGaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${activeGaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${activeGaId}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* Google Tag Manager */}
      {activeGtmId && (
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${activeGtmId}');
          `}
        </Script>
      )}

      {/* Meta Pixel */}
      {activeMetaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${activeMetaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* Custom Head Scripts from Sanity */}
      {customHeadScripts && (
        <div dangerouslySetInnerHTML={{ __html: customHeadScripts }} />
      )}

      {/* Custom Body Scripts from Sanity */}
      {customBodyScripts && (
        <div dangerouslySetInnerHTML={{ __html: customBodyScripts }} />
      )}

      {/* Cookie Consent Banner */}
      {cookieConsentEnabled && cookieAccepted === false && (
        <div className="fixed bottom-6 right-6 left-6 md:left-auto md:max-w-md z-[100] p-6 bg-primary-navy text-white shadow-2xl border border-primary-gold/30 rounded-sm">
          <h4 className="font-label-md text-label-md text-primary-gold uppercase tracking-wider mb-2">
            Privacy & Cookie Preferences
          </h4>
          <p className="font-body-md text-xs opacity-80 mb-4">
            Nexus uses essential cookies and consent tracking to optimize performance and comply with regulatory security standards.
          </p>
          <div className="flex space-x-3">
            <button
              onClick={handleAccept}
              className="px-4 py-2 bg-primary-gold text-white font-label-md text-xs uppercase tracking-widest hover:bg-white hover:text-primary-navy transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={handleReject}
              className="px-4 py-2 border border-white/20 text-white font-label-md text-xs uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              Reject Optional
            </button>
          </div>
        </div>
      )}
    </>
  );
}
