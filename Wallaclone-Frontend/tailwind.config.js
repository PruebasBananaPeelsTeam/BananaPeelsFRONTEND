export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      rotate: {
        'y-180': '180deg',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
