/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#07090e',
          card: '#0f172a',
          border: 'rgba(6, 182, 212, 0.25)',
          cyan: '#06b6d4',
          blue: '#3b82f6',
          purple: '#8b5cf6',
          emerald: '#10b981',
        }
      }
    },
  },
  plugins: [],
}
