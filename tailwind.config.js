/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display: ["Satisfy", "cursive"],
      RockSalt: ["Rock Salt", "cursive"],
      CarterOne: ["Carter One", "cursive"],
      RubikVinyl: ["Rubik Vinyl", "cursive"],
      RacingSansOne: ["Racing Sans One", "cursive"],
      PermanentMarker: ["Permanent Marker", "cursive"],
      Cardo: ["Cardo", "serif"],
    },
    extend: {
      width: {
        132: "28rem",
      },
      height: {
        132: "28rem",
      },
      fontSize: {
        "10xl": "10rem",
      },
      screens: {
        xs: "360px",
      },
    },
  },
  plugins: [],
};
