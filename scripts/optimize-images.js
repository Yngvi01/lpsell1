/**
 * Script para otimização de imagens
 * 
 * Este script processa todas as imagens na pasta public/images e cria versões otimizadas
 * em diferentes tamanhos e formatos.
 * 
 * Para usar este script, você precisa instalar as dependências:
 * npm install sharp glob fs-extra
 * 
 * E então executar:
 * node scripts/optimize-images.js
 */

import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';

// Obter o caminho do diretório atual (equivalente a __dirname em CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurações
const config = {
  // Pasta de entrada (imagens originais)
  inputDir: path.join(__dirname, '../public/images'),
  // Pasta de saída (imagens otimizadas)
  outputDir: path.join(__dirname, '../public/images/optimized'),
  // Formatos de saída
  formats: ['webp', 'avif'],
  // Tamanhos para redimensionar
  sizes: [320, 640, 960, 1280, 1920],
  // Qualidade da imagem (0-100)
  quality: 80,
};

// Cria a pasta de saída se não existir
fs.ensureDirSync(config.outputDir);

/**
 * Processa uma imagem
 * @param {string} imagePath Caminho da imagem original
 */
async function processImage(imagePath) {
  try {
    const filename = path.basename(imagePath);
    const name = path.parse(filename).name;
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    
    console.log(`Processando: ${filename}`);
    
    // Para cada formato
    for (const format of config.formats) {
      // Para cada tamanho
      for (const size of config.sizes) {
        // Pula tamanhos maiores que a imagem original
        if (size > metadata.width) continue;
        
        const outputFilename = `${name}-${size}.${format}`;
        const outputPath = path.join(config.outputDir, outputFilename);
        
        // Redimensiona e converte a imagem
        await image
          .resize(size)
          .toFormat(format, { quality: config.quality })
          .toFile(outputPath);
        
        console.log(`  Criado: ${outputFilename}`);
      }
    }
    
    // Cria uma versão em tamanho original nos formatos otimizados
    for (const format of config.formats) {
      const outputFilename = `${name}.${format}`;
      const outputPath = path.join(config.outputDir, outputFilename);
      
      await image
        .toFormat(format, { quality: config.quality })
        .toFile(outputPath);
      
      console.log(`  Criado: ${outputFilename}`);
    }
    
    console.log(`Concluído: ${filename}\n`);
  } catch (error) {
    console.error(`Erro ao processar ${imagePath}:`, error);
  }
}

/**
 * Função principal
 */
async function main() {
  try {
    // Verifica se a pasta de entrada existe
    if (!fs.existsSync(config.inputDir)) {
      console.log(`A pasta ${config.inputDir} não existe. Criando...`);
      fs.ensureDirSync(config.inputDir);
      console.log(`Coloque suas imagens na pasta ${config.inputDir} e execute este script novamente.`);
      return;
    }
    
    // Encontra todas as imagens na pasta de entrada
    const imagePatterns = ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.svg'];
    const imagePaths = [];
    
    for (const pattern of imagePatterns) {
      // Usando a nova API do glob v11
      const matches = await glob(pattern, { cwd: config.inputDir });
      for (const match of matches) {
        imagePaths.push(path.join(config.inputDir, match));
      }
    }
    
    if (imagePaths.length === 0) {
      console.log(`Nenhuma imagem encontrada em ${config.inputDir}.`);
      return;
    }
    
    console.log(`Encontradas ${imagePaths.length} imagens para processar.\n`);
    
    // Processa cada imagem
    for (const imagePath of imagePaths) {
      await processImage(imagePath);
    }
    
    console.log('Otimização de imagens concluída com sucesso!');
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Executa a função principal
main().catch(error => {
  console.error('Erro na execução principal:', error);
  process.exit(1);
});