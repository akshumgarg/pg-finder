/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fef3f2',
          100: '#fee4e2',
          200: '#fecdca',
          300: '#fda9a5',
          400: '#fb7871',
          500: '#f24e43',
          600: '#df2f23',
          700: '#bc2419',
          800: '#9b2118',
          900: '#80211a',
          950: '#460d08',
        },
      },
    },
  },
  plugins: [],
}
