/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5fc',
          100: '#e1ecf8',
          200: '#c4dcf1',
          300: '#9fc1dc',
          400: '#71a2cc',
          500: '#4f85b8',
          600: '#0b2853', // Brand Accent Blue (from Alpha-24 logo)
          700: '#172033', // Main Headings (Dark Navy/Charcoal)
          800: '#0f172a', // Darker text
          900: '#020617', // Darkest text
        },
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        gold: {
          50: '#fdfbf3',
          100: '#faf3e0',
          200: '#f5e9c8',
          300: '#ecd99e',
          400: '#d4b86a',
          500: '#c2a050',
          600: '#a88840',
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
