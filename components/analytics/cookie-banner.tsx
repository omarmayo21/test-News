"use client";

import React, { useState, useEffect } from "react";

interface CookieBannerProps {
  cookieConsentEnabled: boolean;
}

export function CookieBanner({ cookieConsentEnabled }: CookieBannerProps) {
  const [cookieAccepted, setCookieAccepted] = useState<boolean | null>(null);

  useEffect(() => {
    if (!cookieConsentEnabled) return;
    const saved = localStorage.getItem("nexus_cookie_consent");
    if (saved) {
      setCookieAccepted(saved === "accepted");
    } else {
      setCookieAccepted(false);
    }
  }, [cookieConsentEnabled]);

  const handleAccept = () => {
    localStorage.setItem("nexus_cookie_consent", "accepted");
    setCookieAccepted(true);
    window.dispatchEvent(new CustomEvent("nexus_cookie_consent_change", { detail: "accepted" }));
  };

  const handleReject = () => {
    localStorage.setItem("nexus_cookie_consent", "rejected");
    setCookieAccepted(false);
  };

  if (!cookieConsentEnabled || cookieAccepted !== false) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 left-6 md:left-auto md:max-w-md z-[100] p-6 bg-primary-navy text-white shadow-2xl border border-primary-gold/30 rounded-sm" role="region" aria-label="Cookie preferences">
      <h4 className="font-label-md text-label-md text-primary-gold uppercase tracking-wider mb-2">
        Privacy & Cookie Preferences
      </h4>
      <p className="font-body-md text-xs opacity-80 mb-4">
        Nexus uses essential cookies and consent tracking to optimize performance and comply with regulatory security standards.
      </p>
      <div className="flex space-x-3">
        <button
          onClick={handleAccept}
          type="button"
          className="px-4 py-2 bg-primary-gold text-white font-label-md text-xs uppercase tracking-widest hover:bg-white hover:text-primary-navy transition-colors"
        >
          Accept All
        </button>
        <button
          onClick={handleReject}
          type="button"
          className="px-4 py-2 border border-white/20 text-white font-label-md text-xs uppercase tracking-widest hover:bg-white/10 transition-colors"
        >
          Reject Optional
        </button>
      </div>
    </div>
  );
}
