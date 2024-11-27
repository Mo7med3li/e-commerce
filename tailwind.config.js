/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        primary: {
          50: "#e7f7e7",
          100: "#ceefce",
          200: "#b6e6b6",
          300: "#9dde9d",
          400: "#85d685",
          500: "#6cce6c",
          600: "#54c654",
          700: "#3bbd3b",
          800: "#23b523",
          900: "#0aad0a",
        },
      },
      screens: {
        "2xl": "1320px",
      },
    },
  },
  plugins: [],
};
