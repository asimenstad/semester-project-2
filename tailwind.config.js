/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{js, mjs}"],
  theme: {
    extend: {
      fontFamily: {
        display: "DM Serif Display, serif",
        body: "Raleway, sans-serif",
      },
    },
  },
  plugins: [],
};
