import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-navy": "#0A1624",
        "primary-gold": "#CC9A2C",
        "on-surface": "#1C1C18",
        "on-tertiary": "#ffffff",
        background: "#FDF9F2",
        surface: "#FFFFFF",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#F9F9F9",
        "surface-container": "#F1EDE6",
        "surface-container-high": "#F3F3F4",
        "surface-container-highest": "#E6E2DB",
        "outline-variant": "#CBC6BD",
        outline: "#7A776F",
        secondary: "#494740",
        "secondary-gold": "#B99456",
        "bronze-accent": "#8A6A3F",
        "desert-sand": "#D8CBB4",
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        sm: "0.125rem",
        md: "0.25rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "9999px",
      },
      spacing: {
        unit: "8px",
        "margin-mobile": "20px",
        gutter: "32px",
        "section-padding": "110px",
        "container-max": "1280px",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Source Serif 4", "Libre Caslon Text", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        headline: ["var(--font-serif)", "Source Serif 4", "Libre Caslon Text", "serif"],
        body: ["var(--font-sans)", "Inter", "sans-serif"],
        label: ["var(--font-sans)", "Inter", "sans-serif"],
      },
      fontSize: {
        caption: ["12px", { lineHeight: "1.4", fontWeight: "400" }],
        "label-md": ["14px", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "headline-sm": ["24px", { lineHeight: "1.4", fontWeight: "500" }],
        "headline-md": ["32px", { lineHeight: "1.3", fontWeight: "500" }],
        "headline-lg": ["48px", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-lg-mobile": ["36px", { lineHeight: "1.2", fontWeight: "600" }],
        "display-lg": ["64px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" }],
      },
      boxShadow: {
        ambient: "0 4px 24px rgba(28, 27, 25, 0.04)",
        elevated: "0 12px 32px rgba(10, 22, 36, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
