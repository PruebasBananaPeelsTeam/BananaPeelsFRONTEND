export const content = ['./index.html', './src/**/*.{js,jsx}'];

export const theme = {
  extend: {
    rotate: {
      'y-180': '180deg', // Personalizado para el efecto flip
    },
  },
};

export const plugins = [
  require('@tailwindcss/line-clamp'), // Plugin para limitar caracteres con line-clamp
];