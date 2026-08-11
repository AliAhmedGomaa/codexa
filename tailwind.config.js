/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        codexa: {
          obsidian: '#090D16',
          surface: '#0F172A',
          'surface-hover': '#1E293B',
          border: '#1E293B',
          electric: '#6366F1',
          cyan: '#06B6D4',
          emerald: '#10B981',
          primary: '#F8FAFC',
          secondary: '#94A3B8',
          muted: '#64748B',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
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
