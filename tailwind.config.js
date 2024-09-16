/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0f0f44",
          200: "#bfbfff",
          300: "#1B1B74",
          400: "#0f0f44",
          500: "#050521",
          600: "#09092C",
          odds: "#09092C",
          evens: "#09093D",
        },
        accent: {
          DEFAULT: "#9047C9",
          hover: "#621F96",
          active: "#4D1A7F",
          500: "#621F96",
          600: "#4D1A7F",
          700: "#3D1469",
          800: "#2E1053",
        },
        "caos-black": "#030303",
        "caos-gray": {
          100: "#f8f9fa",
          200: "#e4e4e4",
          300: "#aaaaaa",
          400: "#666666",
        },
      },
      backgroundImage: {
        hero: "url('/src/assets/hero.svg')",
      },
      fontFamily: {
        rubik: ["'Rubik', sans-serif"],
      },
    },
  },
  plugins: [],
};
