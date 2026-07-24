/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        abyss: {
          950: '#020B18',
          900: '#04101F',
          800: '#071A2E',
          700: '#0A2440',
          600: '#0F3358',
        },
        cyan: {
          glow: '#00E5FF',
          soft: '#5CF2FF',
        },
        ocean: {
          DEFAULT: '#0077FF',
          deep: '#0056CC',
        },
        seagreen: '#2ED9A6',
        amberwarn: '#FFB020',
        coral: '#FF5C5C',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        xl2: '20px',
        xl3: '28px',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(0, 229, 255, 0.35)',
        glowLg: '0 0 80px -20px rgba(0, 229, 255, 0.45)',
        card: '0 8px 32px rgba(0, 0, 0, 0.45)',
      },
      backgroundImage: {
        'ocean-radial':
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,119,255,0.25), transparent), radial-gradient(ellipse 60% 40% at 90% 90%, rgba(0,229,255,0.12), transparent)',
        grain: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-24px) translateX(8px)' },
        },
        drift: {
          '0%': { transform: 'translateX(-10%)' },
          '100%': { transform: 'translateX(10%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.06)' },
        },
        rise: {
          '0%': { transform: 'translateY(120%) scale(0.8)', opacity: 0 },
          '10%': { opacity: 0.8 },
          '100%': { transform: 'translateY(-120vh) scale(1.1)', opacity: 0 },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        floatSlow: 'floatSlow 10s ease-in-out infinite',
        drift: 'drift 18s ease-in-out infinite alternate',
        pulseGlow: 'pulseGlow 2.4s ease-in-out infinite',
        rise: 'rise linear infinite',
      },
    },
  },
  plugins: [],
}
