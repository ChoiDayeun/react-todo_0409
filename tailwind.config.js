/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  purge: [],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Noto Sans KR', 'sans-serif'],
      },
      colors: {
        'primary': '#0070f3',
        'background': '#f5f5f5',
        'container': 'rgb(243, 251, 255)',
        'shadow': 'rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'default': '10px',
        'button': '5px',
      },
      boxShadow: {
        'default': '0 2px 5px rgba(0, 0, 0, 0.1)',
      },
      spacing: {
        '20px': '20px',
        '10px': '10px',
      },
      width: {
        '600px': '600px',
        '100%': '100%',
        '150px': '150px',
      },
      padding: {
        '5px': '5px',
        '3px': '3px',
      },
      margin: {
        '20px': '20px',
        '10px': '10px',
        'auto': 'auto',
        '0': '0',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover'],
      textColor: ['hover'],
      borderColor: ['hover'],
    },
  },
  plugins: [],
}
