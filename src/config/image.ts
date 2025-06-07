/**
 * Configuração para otimização de imagens no Astro
 * 
 * Este arquivo configura como as imagens serão otimizadas no projeto.
 * Para usar a API de imagens do Astro, você precisa instalar o pacote @astrojs/image:
 * npm install @astrojs/image sharp
 * 
 * E adicionar o plugin ao seu astro.config.mjs:
 * ```
 * import image from '@astrojs/image';
 * 
 * export default defineConfig({
 *   integrations: [
 *     image({
 *       serviceEntryPoint: '@astrojs/image/sharp'
 *     }),
 *     // outros plugins...
 *   ],
 * });
 * ```
 */

/**
 * Configurações padrão para otimização de imagens
 */
export const defaultImageConfig = {
  // Formatos de saída para imagens otimizadas
  formats: ['webp', 'avif', 'jpeg'],
  
  // Qualidade das imagens otimizadas (0-100)
  quality: 80,
  
  // Tamanhos para imagens responsivas
  sizes: [320, 640, 960, 1280, 1920],
  
  
  // Configurações de placeholder
  placeholder: {
    // Tipo de placeholder (blur, dominant-color, svg)
    type: 'blur',
    // Qualidade do placeholder (0-100)
    quality: 10,
  },
  
  // Configurações de cache
  cache: true,
  
  
  // Diretório para imagens otimizadas
  outputDir: 'dist/assets/images',
};

/**
 * Configurações para diferentes tipos de imagens
 */
export const imageConfigs = {
  // Imagens de hero (grandes, em destaque)
  hero: {
    ...defaultImageConfig,
    quality: 85,
    sizes: [640, 960, 1280, 1920, 2560],
    placeholder: {
      type: 'blur',
      quality: 20,
    },
  },
  
  // Imagens de cards (médias)
  card: {
    ...defaultImageConfig,
    quality: 80,
    sizes: [320, 640, 960, 1280],
  },
  
  // Imagens de thumbnail (pequenas)
  thumbnail: {
    ...defaultImageConfig,
    quality: 75,
    sizes: [160, 320, 640],
  },
  
  // Imagens de perfil (avatares)
  avatar: {
    ...defaultImageConfig,
    quality: 90,
    sizes: [64, 128, 256],
  },
};

/**
 * Configurações para diferentes breakpoints
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/**
 * Gera o atributo sizes para imagens responsivas
 * @param {Object} options Opções para o atributo sizes
 * @returns {string} Atributo sizes
 */
export function getSizes(options: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
  default?: string;
} = {}) {
  const {
    mobile = '100vw',
    tablet = '50vw',
    desktop = '33vw',
    default: defaultSize = '100vw',
  } = options;
  
  return `(max-width: ${breakpoints.sm}px) ${mobile}, (max-width: ${breakpoints.lg}px) ${tablet}, ${desktop}`;
}