/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "responsive-xl": "clamp(12.5rem, 4.318rem + 8.182vw, 16rem)",
        "responsive-lg": "clamp(1.5rem, 1.091rem + 0.909vw, 2rem)",
      },
    },
  },
  plugins: [],
};
