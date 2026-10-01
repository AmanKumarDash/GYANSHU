/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#36444b',
          900: '#f3f6f6',
          800: '#ffffff',
          700: '#e5ebec',
          600: '#a7a9ac',
        },
        signal: {
          DEFAULT: '#005564',
          dim: '#003e49',
        },
        ember: {
          DEFAULT: '#36444b',
          dim: '#28343a',
        },
        mist: {
          900: '#36444b',
          700: '#68777d',
          500: '#7a858a',
          100: '#f0f3f4',
        },
      },
      fontFamily: {
        display: ['"Roboto"', 'Arial', 'sans-serif'],
        body: ['"Roboto"', 'Arial', 'sans-serif'],
        mono: ['"Roboto"', 'Arial', 'sans-serif'],
      },
      fontSize: {
        '10xl': ['10rem', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        '9xl':  ['8rem',  { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        '8xl':  ['6rem',  { lineHeight: '0.92', letterSpacing: '-0.03em' }],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee 25s linear infinite reverse',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
      },
    },
  },
}
