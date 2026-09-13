/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Peyda', 'Vazirmatn', 'system-ui', 'sans-serif'],
        planz: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        neon: {
          DEFAULT: '#D9FF6A',
          soft: '#CFFF8A',
        },
        mint: {
          DEFAULT: '#DDFCEB',
          pale: '#F0FFE4',
        },
        ink: {
          DEFAULT: '#1A1D16',
          secondary: '#5C6356',
        },
        warm: '#FAFDF5',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
};
