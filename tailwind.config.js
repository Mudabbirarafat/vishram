/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // This block used to carry a brown palette (dark-brown, brown,
    // light-brown, white-tinted) and two font families, Schibsted Grotesk
    // and Lato. Nothing in the project used any of them: the design runs on
    // Tailwind's slate/blue/purple, and neither font was ever loaded, so
    // `font-main` would have fallen back to sans-serif anyway. Config that
    // describes a design the code does not have is worse than no config -
    // the next person believes it.
    extend: {},
  },
  plugins: [],
}
