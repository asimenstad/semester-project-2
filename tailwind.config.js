/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{js, mjs}", "./src/js/**/*.mjs"],
  theme: {
    extend: {
      fontFamily: {
        display: "DM Serif Display, serif",
        body: "Raleway, sans-serif",
      },
      colors: {
        main: "#08536A",
        darkGray: "#262626",
        midGray: "#878787",
        lightGray: "#ECECEC",
      },
    },
  },
  plugins: [],
};
