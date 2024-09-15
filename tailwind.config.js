/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0f0f44",
          50: "#f2f2ff",
          100: "#e6e6ff",
          200: "#bfbfff",
          300: "#9999ff",
          400: "#9047C9",
          500: "#0f0f44",
          600: "#0d0d3d",
          700: "#0a0a2e",
        },
        secondary: "#368600",
        accent: { DEFAULT: "#814191", hover: "#6b3574", active: "#4d1f4b" },
        "caos-black": "#030303",
        "caos-gray": {
          100: "#f8f9fa",
          200: "#e4e4e4",
          300: "#aaaaaa",
          400: "#666666",
        },
      },
    },
  },
  plugins: [],
};
