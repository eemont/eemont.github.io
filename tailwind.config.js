/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sauce One", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["League Spartan Variable", "Open Sauce One", "ui-sans-serif", "sans-serif"],
      },
      colors: {
        // Sampled from the LinkedIn banner
        brand: {
          200: "#c4d9fc",
          300: "#99bcfa",
          400: "#6fa3f9",
          500: "#4f8ef7",
          600: "#3f76d8",
          700: "#3360b3",
        },
        ink: {
          DEFAULT: "#1a1a1a",
          950: "#121212",
        },
      },
    },
  },
  plugins: [],
}
