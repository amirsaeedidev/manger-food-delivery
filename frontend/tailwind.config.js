/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Defined in src/styles/variables.css
        sans: ['var(--font-family)'],
      },
      colors: {
        // Admin panel
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
        },
        // Customer app: semantic colors that follow the active theme (see variables.css).
        // Usage: bg-ui-bg, text-ui-fg, bg-ui-card, text-ui-muted, bg-ui-cta ...
        ui: {
          bg: 'var(--ui-bg)',
          sheet: 'var(--ui-sheet)',
          card: 'var(--ui-card)',
          'card-fg': 'var(--ui-card-fg)',
          fg: 'var(--ui-fg)',
          muted: 'var(--ui-muted)',
          line: 'var(--ui-line)',
          field: 'var(--ui-field)',
          'field-fg': 'var(--ui-field-fg)',
          placeholder: 'var(--ui-field-placeholder)',
          link: 'var(--ui-link)',
          price: 'var(--ui-price)',
          accent: 'var(--ui-accent)',
          'accent-fg': 'var(--ui-accent-fg)',
          cta: 'var(--ui-cta-bg)',
          'cta-fg': 'var(--ui-cta-fg)',
          'cta-outline': 'var(--ui-cta-outline)',
          rating: 'var(--ui-rating)',
          badge: 'var(--ui-badge)',
          stepper: 'var(--ui-stepper-bg)',
          'stepper-fg': 'var(--ui-stepper-fg)',
          nav: 'var(--ui-nav-bg)',
          'nav-fg': 'var(--ui-nav-fg)',
          'nav-active': 'var(--ui-nav-active)',
        },
      },
      boxShadow: {
        soft: 'var(--ui-shadow-soft)',
        stepper: 'var(--ui-shadow-stepper)',
        field: 'var(--ui-shadow-field)',
        nav: 'var(--ui-shadow-nav)',
      },
    },
  },
  plugins: [],
};
