/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        "offset-black": "2px 2px black",
        "offset-white": "2px 2px white",
        "offset-grey": "2px 2px grey",
        "offset-black-big": "6px 6px black",
      },
      colors: {
        "js-yellow": "#eab308",
        "js-yellow-hover": "#d2a20e",
        "react-blue": "#61dafb",
        "dsa-orange": "#ff8e3a",
        "header": "#316B83",
      },
    },
  },
  plugins: [],
}
