/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bgMain: '#05070D',
        bgCard: '#0A1020',
        blueElectric: '#1E6BFF',
        blueCyan: '#3DA5FF',
        blueIce: '#A9D4FF',
        textWhite: '#FFFFFF',
        textOffWhite: '#E8EEF9',
      },
      fontFamily: {
        title: ['Orbitron', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 25px rgba(30, 107, 255, 0.35)',
        glowStrong: '0 0 40px rgba(61, 165, 255, 0.6)',
      }
    },
  },
  plugins: [],
};