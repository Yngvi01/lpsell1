// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://lpsell.com.br', // Substitua pelo seu domínio real se for diferente
  integrations: [
    sitemap()
  ],
  vite: {
    plugins: [
      tailwindcss({
        configFile: './tailwind.config.cjs' // Adicionado para especificar o arquivo de configuração
      })
    ],
  },
});
