import type { Config } from 'tailwindcss';

const v = (name: string) => `var(--${name})`;

export default {
  content: ['./src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper:   v('paper'),
        paper2:  v('paper-2'),
        paper3:  v('paper-3'),
        sheet:   v('sheet'),
        ink:     v('ink'),
        ink2:    v('ink-2'),
        ink3:    v('ink-3'),
        ink4:    v('ink-4'),
        hair:    v('hair'),
        forest: {
          50:  v('forest-50'),
          100: v('forest-100'),
          200: v('forest-200'),
          300: v('forest-300'),
          400: v('forest-400'),
          500: v('forest-500'),
          600: v('forest-600'),
          700: v('forest-700'),
          800: v('forest-800'),
          900: v('forest-900'),
        },
        orange: {
          DEFAULT: v('orange'),
          soft:    v('orange-soft'),
          edge:    v('orange-edge'),
          deep:    v('orange-deep'),
        },
        crit: {
          DEFAULT: v('crit'),
          bg:      v('crit-bg'),
          edge:    v('crit-edge'),
        },
        warn:    v('warn'),
        ok:      v('ok'),
        info:    v('info'),
      },
      fontFamily: {
        serif: ['Fraunces', 'Source Serif 4', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono:  ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sharp: v('r-sharp'),
        card:  v('r-card'),
        soft:  v('r-soft'),
        pill:  v('r-pill'),
      },
      transitionTimingFunction: {
        solon: v('ease'),
      },
      transitionDuration: {
        fast: v('t-fast'),
        med:  v('t-med'),
        slow: v('t-slow'),
      },
      boxShadow: {
        line:    v('line-1'),
        shade:   v('shade-1'),
        pop:     v('shade-pop'),
      },
    },
  },
  plugins: [],
} satisfies Config;
