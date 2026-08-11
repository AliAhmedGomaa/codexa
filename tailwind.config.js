/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        codexa: {
          obsidian: 'rgb(var(--cx-obsidian) / <alpha-value>)',
          surface: 'rgb(var(--cx-surface) / <alpha-value>)',
          'surface-hover': 'rgb(var(--cx-surface-hover) / <alpha-value>)',
          border: 'rgb(var(--cx-border) / <alpha-value>)',
          electric: 'rgb(var(--cx-electric) / <alpha-value>)',
          cyan: 'rgb(var(--cx-cyan) / <alpha-value>)',
          emerald: 'rgb(var(--cx-emerald) / <alpha-value>)',
          primary: 'rgb(var(--cx-primary) / <alpha-value>)',
          secondary: 'rgb(var(--cx-secondary) / <alpha-value>)',
          muted: 'rgb(var(--cx-muted) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: [
          'var(--cx-font-sans)',
          '"Plus Jakarta Sans"',
          '"IBM Plex Sans Arabic"',
          'sans-serif',
        ],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        codexa: '0.75rem',
      },
      boxShadow: {
        'glow-primary': '0 0 25px -5px rgba(99, 102, 241, 0.35)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.35)',
      },
      maxWidth: {
        content: '70rem',
        wide: '80rem',
      },
      transitionTimingFunction: {
        codexa: 'cubic-bezier(0.2, 0, 0, 1)',
      },
    },
  },
  plugins: [],
};
