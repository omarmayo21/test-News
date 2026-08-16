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
        "primary-navy": "#0B132B",
        "primary-navy-dark": "#070D1F",
        "primary-navy-light": "#152244",
        "primary-gold": "#C5A059",
        "primary-gold-light": "#E2BF7D",
        "primary-gold-dark": "#A37F38",
        "on-surface": "#1C1C18",
        "on-tertiary": "#ffffff",
        background: "#FDFBF7",
        surface: "#FFFFFF",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#F8F6F0",
        "surface-container": "#F1EDE4",
        "surface-container-high": "#E8E2D6",
        "surface-container-highest": "#DDD6C7",
        "outline-variant": "#D0C8B8",
        outline: "#7A776F",
        secondary: "#494740",
        "secondary-gold": "#B99456",
        "bronze-accent": "#8A6A3F",
        "desert-sand": "#D8CBB4",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        sm: "0.125rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
      spacing: {
        unit: "8px",
        "margin-mobile": "20px",
        gutter: "32px",
        "section-padding": "96px",
        "container-max": "1280px",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Source Serif 4", "Libre Caslon Text", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        headline: ["var(--font-serif)", "Source Serif 4", "Libre Caslon Text", "Georgia", "serif"],
        body: ["var(--font-sans)", "Inter", "sans-serif"],
        label: ["var(--font-sans)", "Inter", "sans-serif"],
      },
      fontSize: {
        caption: ["12px", { lineHeight: "1.4", fontWeight: "400" }],
        "label-md": ["13px", { lineHeight: "1", letterSpacing: "0.08em", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "1.65", fontWeight: "400" }],
        "body-lg": ["18px", { lineHeight: "1.65", fontWeight: "400" }],
        "headline-sm": ["22px", { lineHeight: "1.35", fontWeight: "600" }],
        "headline-md": ["30px", { lineHeight: "1.3", fontWeight: "600" }],
        "headline-lg": ["44px", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-lg-mobile": ["32px", { lineHeight: "1.2", fontWeight: "600" }],
        "display-lg": ["56px", { lineHeight: "1.12", letterSpacing: "-0.02em", fontWeight: "600" }],
      },
      boxShadow: {
        ambient: "0 4px 20px rgba(11, 19, 43, 0.04)",
        elevated: "0 12px 32px rgba(11, 19, 43, 0.08)",
        "gold-glow": "0 0 25px rgba(197, 160, 89, 0.25)",
        card: "0 2px 12px rgba(11, 19, 43, 0.05), 0 1px 3px rgba(11, 19, 43, 0.03)",
        "card-hover": "0 20px 40px rgba(11, 19, 43, 0.12), 0 1px 3px rgba(11, 19, 43, 0.05)",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
