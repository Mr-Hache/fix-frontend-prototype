import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        default:
          'inset -4px -4px 4px rgba(0, 0, 0, 0.25), 4px 4px 4px rgba(0, 0, 0, 0.25)',
        focus: 'inset 4px 4px 3px rgba(0, 0, 0, 0.25)',
        input: 'inset 2px 4px 2px rgba(0, 0, 0, 0.25)',
      },
      colors: {
        // Colores de la paleta
        black: {
          1: '#000000',
        },
        gray: {
          1: '#141414',
          2: '#212122',
          3: '#262628',
          4: '#3E3E40',
          5: '#919098',
        },
        orange: {
          1: '#FE8330',
        },
        white: {
          1: '#F0F0EB',
        },

        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
    fontSize: {
      xs: '10px',
      sm: '12px',
      base: '14px',
      lg: '16px',
      xl: '20px',
      '2xl': '26px',
      '3xl': '32px',
      '4xl': '48px',
    },
  },

  plugins: [require('tailwind-scrollbar')],
} satisfies Config;
