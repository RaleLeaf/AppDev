/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    
  ],
  safelist: ['bg-[#cfff33]', 'hover:bg-[#b3e600]'],
  theme: {
    extend: {},
  },
  plugins: [],
}
