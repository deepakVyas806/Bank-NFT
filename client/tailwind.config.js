/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: '#f8f9fa', // Custom light color to match Bootstrap
      },
    },
  },
  plugins: [],
}

