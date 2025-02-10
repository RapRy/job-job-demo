import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F2F4F3",
        foreground: "#5E6472",
        "primary-color": "#0496FF",
        "secondary-color": "#0D47A1",
        "text-color-1": "#14110F",
        warning: "#E63946",
        info: "#8ECAE6",
        success: "#A7C957"
      },
    },
  },
  plugins: [],
} satisfies Config;
