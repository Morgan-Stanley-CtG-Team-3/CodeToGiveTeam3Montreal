/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette lavande/violet inspirée de l'image
        primary: {
          50: '#F5F3FF',   // Très clair
          100: '#EBE9FE',  // Presque blanc
          200: '#E8E8F5',  // Lavande très clair
          300: '#C5C6E8',  // Lavande principal (de l'image)
          400: '#A5A6D9',  // Lavande moyen
          500: '#8B87C7',  // Violet moyen/accent
          600: '#6B67A8',  // Violet
          700: '#4F4B7E',  // Violet foncé
          800: '#3D3B5E',  // Violet très foncé (de l'image)
          900: '#2E294E',  // Presque noir violet
        },
        // Alias pour faciliter l'utilisation
        'lavender': {
          light: '#E8E8F5',
          DEFAULT: '#C5C6E8',
          dark: '#8B87C7',
        },
        'purple': {
          light: '#8B87C7',
          DEFAULT: '#3D3B5E',
          dark: '#2E294E',
        }
      },
      fontSize: {
        // Tailles augmentées pour l'accessibilité seniors
        'base': ['18px', { lineHeight: '1.7' }],
        'lg': ['20px', { lineHeight: '1.7' }],
        'xl': ['22px', { lineHeight: '1.7' }],
        '2xl': ['26px', { lineHeight: '1.6' }],
        '3xl': ['32px', { lineHeight: '1.5' }],
        '4xl': ['40px', { lineHeight: '1.4' }],
        '5xl': ['48px', { lineHeight: '1.3' }],
      },
      spacing: {
        // Espacement généreux pour faciliter les clics
        'btn': '14px',
        'btn-lg': '18px',
      },
      minHeight: {
        'btn': '48px',  // Minimum recommandé pour l'accessibilité
        'btn-lg': '56px',
      },
      minWidth: {
        'btn': '120px',
        'btn-lg': '160px',
      },
    },
  },
  plugins: [],
}
