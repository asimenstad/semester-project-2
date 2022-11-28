/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{js, mjs}"],
  theme: {
    extend: {
      fontFamily: {
        display: "DM Serif Display, serif",
        body: "Raleway, sans-serif",
      },
      colors: {
        main: "#08536A",
        darkGray: "#262626",
        lightGray: "#ECECEC",
      },
    },
  },
  plugins: [],
};
