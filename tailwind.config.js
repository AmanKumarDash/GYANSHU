/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Pearl White canvas (brand palette)
        paper: { DEFAULT: '#F8FCFC', 2: '#EEF6F5', 3: '#E2EEEC' },
        // Deep Teal (brand palette) for text and dark surfaces
        ink: { DEFAULT: '#0B3D3B', 950: '#062B2A', 900: '#0B3D3B', 800: '#0F4744', 700: '#15524F', 600: '#1F605C' },
        muted: { DEFAULT: '#4A6866', soft: '#5A7674', faint: '#AFC6C3' },
        line: { DEFAULT: '#DCE9E7', dark: 'rgba(255,255,255,.1)' },
        // Gyanshu brand teal scale
        brand: { 50: '#EEFBF9', 100: '#D3F4EF', 300: '#7EE3D9', 400: '#14B8A6', 500: '#0E8378', 600: '#0C6B63', 700: '#0B4D49', 900: '#0B3D3B' },
        // Legacy aliases kept for older components
        signal: { DEFAULT: '#0E8378', dim: '#0B4D49' },
        ember: { DEFAULT: '#0B3D3B', dim: '#0F4744' },
        mist: { 900: '#0B3D3B', 700: '#4A6866', 500: '#5A7674', 100: '#F8FCFC' },
      },
      fontFamily: {
        display: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        nav: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
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
        card: '0 1px 0 rgba(11,61,59,.04), 0 12px 32px -12px rgba(11,61,59,.12)',
        lift: '0 1px 0 rgba(11,61,59,.04), 0 30px 60px -24px rgba(11,61,59,.28)',
        glow: '0 0 0 1px rgba(20,184,166,.25), 0 20px 60px -20px rgba(20,184,166,.45)',
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
