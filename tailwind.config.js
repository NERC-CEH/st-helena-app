// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const flumensTailwind = require('@flumens/tailwind/tailwind.config.js');

const primary = {
  // https://www.tailwindshades.com/#color=0%2C82.75862068965516%2C22.745098039215687&step-up=13&step-down=5&hue-shift=0&name=dark-burgundy&base-stop=6&v=1&overrides=e30%3D
  DEFAULT: '#6A0A0A',
  50: '#FCE4E4',
  100: '#FAC6C6',
  200: '#F48989',
  300: '#EE4D4D',
  400: '#E31515',
  500: '#A71010',
  600: '#6A0A0A',
  700: '#530808',
  800: '#3B0606',
  900: '#240303',
  950: '#180202',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    'node_modules/@flumens/ionic/dist/**/*.{js,ts,jsx,tsx}',
    'node_modules/@flumens/tailwind/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      ...flumensTailwind.theme?.extend,

      colors: {
        primary,

        secondary: {
          // https://www.tailwindshades.com/#color=210.17142857142855%2C100%2C34.31372549019608&step-up=9&step-down=13&hue-shift=0&name=endeavour&base-stop=7&v=1&overrides=e30%3D
          DEFAULT: '#0057AF',
          50: '#DAEDFF',
          100: '#C3E1FF',
          200: '#96CAFF',
          300: '#68B3FF',
          400: '#3A9CFF',
          500: '#0C85FF',
          600: '#006EDD',
          700: '#0057AF',
          800: '#00366D',
          900: '#00152A',
          950: '#000509',
        },

        tertiary: {
          // https://www.tailwindshades.com/#color=278%2C20.833333333333336%2C28.235294117647058&step-up=10&step-down=10&hue-shift=0&name=voodoo&base-stop=7&v=1&overrides=e30%3D
          DEFAULT: '#4C3957',
          50: '#EFEAF1',
          100: '#E3DBE7',
          200: '#CBBCD3',
          300: '#B39DBF',
          400: '#9A7EAB',
          500: '#826195',
          600: '#674D76',
          700: '#4C3957',
          800: '#312538',
          900: '#161119',
          950: '#09070A',
        },

        success: primary,

        warning: {
          // https://www.tailwindshades.com/#color=23.17241379310345%2C100%2C28.431372549019606&step-up=10&step-down=11&hue-shift=0&name=brown&base-stop=7&v=1&overrides=e30%3D
          DEFAULT: '#913800',
          50: '#FFEADE',
          100: '#FFDBC4',
          200: '#FFBB91',
          300: '#FF9C5E',
          400: '#FF7D2B',
          500: '#F75F00',
          600: '#C44C00',
          700: '#913800',
          800: '#592200',
          900: '#210D00',
          950: '#050200',
        },

        danger: {
          // https://www.tailwindshades.com/#color=0%2C85.36585365853658%2C59.80392156862745&step-up=8&step-down=11&hue-shift=0&name=flamingo&base-stop=5&v=1&overrides=e30%3D
          DEFAULT: '#F04141',
          50: '#FDEBEB',
          100: '#FCD8D8',
          200: '#F9B2B2',
          300: '#F68D8D',
          400: '#F36767',
          500: '#F04141',
          600: '#E71212',
          700: '#B30E0E',
          800: '#7F0A0A',
          900: '#4B0606',
          950: '#310404',
        },
      },
    },
  },
  plugins: flumensTailwind.plugins,
};
