/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-hover': '1px 7px 20px 0px black, 1px -4px 33px black',
        'custom-active': '0px 1px 5px 0px black, -1px -2px 33px black',
      },
      transitionDuration: {
        'default': '0.3s',
        'short': '0.1s',
      },
    },
  },
  plugins: [],
}