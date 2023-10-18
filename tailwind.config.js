/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,twig,scss}",
  ],
  theme: {
    extend: {},
    fontSize: {
      base: '1rem',
      sm: '0.8rem',
      md: '1.4rem',
      lg: '1.5rem',
      xl: '1.6rem',
      '2xl': '1.8rem',
    },
    aspectRatio: {
      auto: 'auto',
      square: '1 / 1',
      video: '16 / 9',
      test: '13 / 5',
      team: '3 / 4',
      homebanner: '2 / 3',
    },
    colors: {
      "black": "#000",
      "white": "#fff",
      "yellow": "#fdbf0f",
      "yellow-hover": "#e0a704",
    },
    fontFamily: {
      'Montserrat': ["Montserrat", "sans-serif"],
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      'extra-bold': '800',
      black: '900'
    },
    container: {
      // you can configure the container to be centered
      center: true,

      // or have default horizontal padding
      padding: {
        DEFAULT: '1.5rem',
        sm: '2rem',
      },

      // default breakpoints but with 40px removed
      screens: {
        "xs": '480px',
        "sm": '640px',
        "md": '768px',
        "lg": '1280px',
        "xl": '1440px',
        "2xl": '1920px',
      },
    },
  },
  plugins: [
    function ({
      addComponents
    }) {
      addComponents({
        '.container': {
          maxWidth: '82.5rem',
          // '@screen lg': {
          //   maxWidth: 'calc(100% - 140px)'
          // },
          // '@screen xl': {
          //   maxWidth: '75%',
          // },
          // '@screen xl': {
          //   maxWidth: '1280px',
          // },
          // '@screen 2xl': {
          //   maxWidth: '82.5rem',
          // },
          // '@screen 3xl': {
          //   maxWidth: '1440px',
          // },
        }
      })
    }
  ],
}