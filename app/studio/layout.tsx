import React from "react";

export const metadata = {
  title: "Nexus CMS Studio",
  description: "Sanity Studio CMS Control Center for Nexus Resources",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
