import { nextui } from "@nextui-org/theme";
import { animate } from "framer-motion";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        block: "#a6a6a8",
        available: "#cecece",
        dark: {
          block: "#343a40",
          available: "#495057",
        },
      },
      animation: {
        shimmer: "shimmer 2.5s ease-in-out infinite",
        scrollable: "scrollable 1s ease-in-out 1",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        scrollable: {
          "0%": { paddingTop: "0px" },
          "50%": { paddingTop: "20px" },
          "100%": { paddingTop: "0px" },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
