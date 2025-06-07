/**
 * Utilitários para otimização de imagens
 */

/**
 * Interface para configuração de imagens
 */
export interface ImageConfig {
  width?: number;
  height?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  quality?: number;
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

/**
 * Gera um placeholder de baixa qualidade para imagens
 * @param color Cor do placeholder (hexadecimal)
 * @param width Largura do placeholder
 * @param height Altura do placeholder
 * @returns URL de dados do placeholder
 */
export function generatePlaceholder(color: string = '#e2e8f0', width: number = 100, height: number = 100): string {
  // Cria um SVG simples como placeholder
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${color}"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${Math.max(width, height) / 10}px" fill="#94a3b8">Imagem</text>
  </svg>`;
  
  // Converte o SVG para uma URL de dados
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/**
 * Verifica se uma URL de imagem é externa (começa com http ou https)
 * @param src URL da imagem
 * @returns Verdadeiro se a imagem for externa
 */
export function isExternalImage(src: string): boolean {
  return src?.startsWith('http');
}

/**
 * Gera uma URL para uma imagem otimizada
 * @param src URL da imagem original
 * @param config Configuração da imagem
 * @returns URL da imagem otimizada
 */
export function getOptimizedImageUrl(src: string, config: ImageConfig = {}): string {
  // Se a imagem for externa, retorna a URL original
  if (isExternalImage(src)) {
    return src;
  }
  
  // Se a imagem for local e for SVG, retorna a URL original
  if (src.endsWith('.svg')) {
    return src;
  }
  
  // Implementação básica - em um projeto real, você usaria um serviço de otimização de imagens
  // como Cloudinary, Imgix, ou a API de imagens do Astro
  return src;
}

/**
 * Gera um conjunto de URLs para diferentes tamanhos de tela (srcset)
 * @param src URL da imagem original
 * @param sizes Array de larguras para gerar o srcset
 * @param config Configuração da imagem
 * @returns String de srcset para uso em elementos <img> ou <source>
 */
export function generateSrcSet(
  src: string, 
  sizes: number[] = [320, 640, 960, 1280, 1920], 
  config: ImageConfig = {}
): string {
  // Se a imagem for externa ou SVG, retorna undefined
  if (isExternalImage(src) || src.endsWith('.svg')) {
    return '';
  }
  
  // Gera o srcset para cada tamanho
  return sizes
    .map(size => {
      const optimizedUrl = getOptimizedImageUrl(src, { ...config, width: size });
      return `${optimizedUrl} ${size}w`;
    })
    .join(', ');
}

/**
 * Gera um atributo sizes para uso com srcset
 * @param sizes String de tamanhos para diferentes breakpoints
 * @returns String de sizes para uso em elementos <img> ou <source>
 */
export function getSizes(sizes: string = '(max-width: 768px) 100vw, 50vw'): string {
  return sizes;
}