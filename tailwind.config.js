/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    // Standard Tailwind breakpoints are already responsive:
    // sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
    extend: {
      colors: {
        'dark-brown': '#29231d',
        'brown': '#41372e',
        'light-brown': '#e5d9d3',
        'white-tinted': '#f3eee9',
      },
      fontFamily: {
        main: ['"Schibsted Grotesk"', 'sans-serif'],
        second: ['Lato', 'sans-serif'],
      },
      
      // *** REMOVED: Custom fontSize with fixed 'vw' units ***
      // To make text responsive, use standard Tailwind classes 
      // with responsive prefixes in your components, for example:
      // <h1 class="text-4xl md:text-6xl lg:text-8xl">Hello</h1>
      
      // *** REMOVED: Custom padding with fixed 'vw' units ***
      // To make padding responsive, use standard Tailwind classes 
      // with responsive prefixes in your components, for example:
      // <div class="p-4 md:p-8 lg:p-12">Content</div>

      borderRadius: {
        // Keep this if you want a custom rounded value
        default: '2vw',
      },
    },
  },
  plugins: [],
}