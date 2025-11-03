/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        accent: "#7C3AED",
        background: "#F9FAFB",
        surface: "#FFFFFF",
        text: "#111827"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      }
    }
  },
  plugins: []
};
