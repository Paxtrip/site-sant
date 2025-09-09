import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // Здесь можно определить свою палитру и другие кастомизации
      colors: {
        primary: '#0070f3', // Пример основного цвета
        secondary: '#ff4081', // Пример вторичного цвета
      },
    },
    // Определение брейкпоинтов для адаптивности
    screens: {
      sm: '640px', // Планшеты (portrait)
      md: '768px', // Планшеты (landscape)
      lg: '1024px', // Ноутбуки и десктопы
      xl: '1280px', // Большие экраны
      '2xl': '1536px',
    },
  },
  plugins: [],
};
export default config;
