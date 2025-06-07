/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // Configurações para imagens responsivas
      aspectRatio: {
        'auto': 'auto',
        'square': '1 / 1',
        'video': '16 / 9',
        'cinema': '21 / 9',
        'portrait': '3 / 4',
        'card': '4 / 3',
      },
      // Configurações para blur e filtros
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      // Configurações para animações de carregamento
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-out': 'fadeOut 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [
    // Plugin para aspect-ratio
    require('@tailwindcss/aspect-ratio'),
    
    // Plugin personalizado para placeholders de imagens
    function({ addUtilities }) {
      const newUtilities = {
        '.placeholder-blur': {
          'filter': 'blur(20px)',
          'transform': 'scale(1.1)',
          'transition': 'filter 0.3s ease-in-out, transform 0.3s ease-in-out',
        },
        '.placeholder-blur-none': {
          'filter': 'blur(0)',
          'transform': 'scale(1)',
        },
        '.image-rendering-pixelated': {
          'image-rendering': 'pixelated',
        },
        '.image-rendering-crisp': {
          'image-rendering': 'crisp-edges',
        },
      };
      
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
  // Configurações para modo escuro
  darkMode: 'class',
  // Configurações para variantes
  variants: {
    extend: {
      blur: ['hover', 'group-hover'],
      brightness: ['hover', 'group-hover'],
      saturate: ['hover', 'group-hover'],
    },
  },
};