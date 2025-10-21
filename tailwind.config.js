/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // supaya bisa pakai dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#22c55e',   // hijau utama IngetIn
        secondary: '#10b981', // hijau lembut
      },
    },
  },
  plugins: [],
}
