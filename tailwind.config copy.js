import animations from '@midudev/tailwind-animations'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [animations]
}
