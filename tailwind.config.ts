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
                background: "#e5f4e3",
                foreground: "#1a1a2e",
                honeydew: "#e5f4e3",
                "cool-sky": "#5da9e9",
                "french-blue": "#003f91",
                "velvet-purple": "#6d326d",
            },
        },
    },
    plugins: [],
};
export default config;
