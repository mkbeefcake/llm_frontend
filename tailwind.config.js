/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "background-color": "#212C3D",
        "black-gray": "#1B222E",
        "input-color": "#37404F",
        "devider-color": "#73777F",
        "link-color": "#6B54F8",
      },
    },
  },
  plugins: [],
};
