/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      colors: {
        border: "hsl(var(--border))",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      backgroundImage: {
        'hero-farm': "url('/farm-bg.jpg')",
      }

    },
  },

  plugins: [],
};
