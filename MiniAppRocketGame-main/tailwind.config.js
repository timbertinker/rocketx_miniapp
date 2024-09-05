/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'white_20' : '#ffffff33',
        'bgGradientColor1' : '#0000d0',
        'bgGradientColor2' : '#9393EB',
        'bgNavbar' : '#3861fb',
        'blueFaded' : "#ACC1D9",
        'gradient-border': 'linear-gradient(180deg, #FFFFFF 0%, #FAD557 100%)',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        BadaBoom:['BadaBoom BB','sans-serif']
      },
      height: {
        'height_1px' : '1px',
      },
      animation: {
        'slide-in-top': 'slideInTop 0.5s ease-out forwards',
        'slide-out-bottom': 'slideOutBottom 0.5s ease-in forwards',
        "fade-out": 'fade-out 0.2s ease-out',
      },
      keyframes: {
        slideInTop: {
          '0%': { bottom: '-300px'},
          '100%': { bottom: '0'},
        },
        slideOutBottom: {
          '0%': { bottom: '0'},
          '100%': { bottom: '-300px'},
        },
        "fade-out": {
          'from': { opacity: 0 },
          'to': { opacity: 1 }
        }
      },
    },
  },
  plugins: [],
}

