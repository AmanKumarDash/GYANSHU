/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0a0a0a',
          900: '#ffffff',
          800: '#f5f5f2',
          700: '#e7e7e2',
          600: '#d4d4ce',
        },
        signal: {
          DEFAULT: '#e8ff47',   // electric lime — primary accent
          dim: '#b8cc38',
        },
        ember: {
          DEFAULT: '#ff6b35',   // warm orange — secondary accent
          dim: '#cc5529',
        },
        mist: {
          900: '#525252',
          700: '#737373',
          500: '#a3a3a3',
          100: '#f5f5f5',
        },
      },
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        body: ['"Cabinet Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
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
