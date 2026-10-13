/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm editorial canvas
        paper: { DEFAULT: '#f3f2ee', 2: '#ebe9e3', 3: '#e2e0d9' },
        // Near-black with a teal undertone
        ink: { DEFAULT: '#0c1517', 950: '#070d0f', 900: '#0c1517', 800: '#131e21', 700: '#1c292c', 600: '#2a383b' },
        muted: { DEFAULT: '#5d696c', soft: '#8a9497', faint: '#b4bbbc' },
        line: { DEFAULT: '#e1dfd8', dark: 'rgba(255,255,255,.1)' },
        // Gyanshu brand teal scale
        brand: { 50: '#eef8f6', 100: '#dbf0ec', 300: '#5fd8c6', 400: '#26c8b2', 500: '#0a8a8f', 600: '#00707a', 700: '#005564', 900: '#003e49' },
        // Legacy aliases kept for older components
        signal: { DEFAULT: '#0a8a8f', dim: '#005564' },
        ember: { DEFAULT: '#0c1517', dim: '#131e21' },
        mist: { 900: '#0c1517', 700: '#5d696c', 500: '#8a9497', 100: '#f3f2ee' },
      },
      fontFamily: {
        display: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
        poster: ['"Bebas Neue"', 'Impact', 'sans-serif'],
      },
      fontSize: {
        '10xl': ['10rem', { lineHeight: '0.86', letterSpacing: '-0.01em' }],
        '9xl': ['8rem', { lineHeight: '0.86', letterSpacing: '-0.01em' }],
        '8xl': ['6rem', { lineHeight: '0.9', letterSpacing: '-0.01em' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        card: '0 1px 0 rgba(12,21,23,.04), 0 12px 32px -12px rgba(12,21,23,.12)',
        lift: '0 1px 0 rgba(12,21,23,.04), 0 30px 60px -24px rgba(12,21,23,.28)',
        glow: '0 0 0 1px rgba(38,200,178,.25), 0 20px 60px -20px rgba(38,200,178,.45)',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(.16,1,.3,1)',
        'in-out-expo': 'cubic-bezier(.76,0,.24,1)',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee 40s linear infinite reverse',
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        ping2: 'ping2 2.4s cubic-bezier(0,0,.2,1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        ping2: {
          '0%': { transform: 'scale(1)', opacity: '.7' },
          '80%, 100%': { transform: 'scale(2.6)', opacity: '0' },
        },
      },
    },
  },
}
