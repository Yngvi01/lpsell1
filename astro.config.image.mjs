/**
 * Configuração alternativa do Astro com suporte a otimização de imagens
 * 
 * Para usar esta configuração, você precisa instalar as dependências:
 * npm install @astrojs/image sharp
 * 
 * E renomear este arquivo para astro.config.mjs (ou copiar seu conteúdo)
 */

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Descomente estas linhas após instalar as dependências
// import image from '@astrojs/image';

export default defineConfig({
  integrations: [
    tailwind(),
    
    // Descomente estas linhas após instalar as dependências
    // image({
    //   serviceEntryPoint: '@astrojs/image/sharp',
    //   logLevel: 'info',
    //   cacheDir: './.astro/image',
    // }),
  ],
  
  // Configurações de otimização de imagens
  image: {
    // Serviço de otimização de imagens (sharp é recomendado)
    service: {
      entrypoint: '@astrojs/image/sharp',
    },
    // Formatos de saída para imagens otimizadas
    formats: ['webp', 'avif', 'jpeg'],
    // Tamanhos para imagens responsivas
    sizes: [320, 640, 960, 1280, 1920],
    // Qualidade das imagens otimizadas (0-100)
    quality: 80,
    // Diretório para imagens otimizadas
    outputDir: 'dist/assets/images',
  },
  
  // Configurações de build
  build: {
    // Inlining de assets pequenos
    inlineStylesheets: 'auto',
    // Compressão de assets
    assets: 'assets',
  },
  
  // Configurações de compressão
  compressHTML: true,
});