/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'float-rotate': 'floatRotate 6s ease-in-out infinite',
      },
      keyframes: {
        floatRotate: {
          '0%': {
            transform: 'translateY(0px) rotate(0deg)',
          },
          '50%': {
            transform: 'translateY(-10px) rotate(3deg)',
          },
          '100%': {
            transform: 'translateY(0px) rotate(0deg)',
          },
        },
      },
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
