import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        honeydew: "#e5f4e3",
        "cool-sky": "#5da9e9",
        "french-blue": "#003f91",
        "velvet-purple": "#6d326d",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
      },
      fontSize: {
        base: ["18px", "28px"],
        lg: ["20px", "30px"],
        xl: ["24px", "32px"],
        "2xl": ["28px", "36px"],
        "3xl": ["32px", "40px"],
        "4xl": ["40px", "48px"],
        "5xl": ["48px", "56px"],
      },
    },
  },
  plugins: [],
};
export default config;
