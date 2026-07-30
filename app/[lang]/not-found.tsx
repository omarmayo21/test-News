import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-32 px-margin-mobile md:px-section-padding max-w-2xl mx-auto text-center space-y-6">
      <div className="font-headline font-display-lg text-6xl text-primary-gold font-bold">
        404
      </div>
      <h1 className="font-headline text-headline-lg text-primary-navy">
        Page Not Found
      </h1>
      <p className="font-body text-body-lg opacity-80">
        The page or resource you are looking for may have been moved, renamed, or is unavailable.
      </p>
      <div className="pt-6">
        <Link
          href="/en"
          className="inline-block px-8 py-4 bg-primary-gold text-white font-label text-label-md uppercase tracking-widest hover:bg-primary-navy transition-colors"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
