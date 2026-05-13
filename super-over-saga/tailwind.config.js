/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bangers: ['Bangers', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        comic: {
          yellow: '#FFD600',
          red:    '#FF3D00',
          blue:   '#0091EA',
          green:  '#00C853',
          purple: '#AA00FF',
          black:  '#0a0a0a',
        },
      },
    },
  },
  plugins: [],
}
