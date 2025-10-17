import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1rem", screens: { "2xl": "1320px" } },
    extend: {
      fontFamily: {
        sf: ['"SF Pro"', "sans-serif"],
      },
      colors: {
        background: "#F2F2F2",
        surface: "#0C1224",
        card: "#1B1E28",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: { soft: "0 6px 20px rgba(0,0,0,0.2)" },
    },
  },
  plugins: [],
} satisfies Config;
