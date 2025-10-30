import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f8ff',
          100: '#d6e4ff',
          200: '#adc8ff',
          300: '#84a9ff',
          400: '#6690ff',
          500: '#3366ff',
          600: '#254eda',
          700: '#1d3db3',
          800: '#142b80',
          900: '#0d1c4d'
        }
      }
    }
  },
  plugins: [typography]
};

export default config;
