/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        cream: {
          50: '#FDFAF3',
          100: '#FAF4E8',
          200: '#F3EADA',
          300: '#EBDEC5',
        },
        sand: '#EFE5D0',
        forest: {
          DEFAULT: '#1E4633',
          dark: '#143122',
          deeper: '#0C2118',
          light: '#2C5C43',
          pale: '#E4EEE4',
        },
        leaf: {
          DEFAULT: '#5C8A4A',
          light: '#7FA86B',
          pale: '#EDF3E6',
        },
        gold: {
          DEFAULT: '#D9A441',
          light: '#EFC974',
          deep: '#B8862B',
        },
        cocoa: '#7C5A3A',
        clay: '#A96F44',
        ink: '#22301F',
      },
      boxShadow: {
        card: '0 10px 40px -12px rgba(20, 49, 34, 0.14)',
        lift: '0 24px 60px -16px rgba(20, 49, 34, 0.22)',
        soft: '0 4px 20px -6px rgba(20, 49, 34, 0.10)',
        gold: '0 10px 30px -8px rgba(217, 164, 65, 0.45)',
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(60rem 30rem at 85% -10%, rgba(92,138,74,0.16), transparent 60%), radial-gradient(50rem 28rem at -10% 110%, rgba(217,164,65,0.14), transparent 55%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'page-in': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'page-in': 'page-in 0.45s ease-out both',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
}
