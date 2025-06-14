
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js para não usar modelos locais e usar o cache do navegador.
env.allowLocalModels = false;
env.useBrowserCache = true;

const MAX_IMAGE_DIMENSION = 1024;

function resizeImageIfNeeded(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
  let { naturalWidth: width, naturalHeight: height } = image;

  if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
    if (width > height) {
      height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
      width = MAX_IMAGE_DIMENSION;
    } else {
      width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
      height = MAX_IMAGE_DIMENSION;
    }
  }
  
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0, width, height);
}

const processImage = async (imageElement: HTMLImageElement): Promise<Blob> => {
    if (!(window as any).segmenter) {
        console.log('Inicializando modelo de segmentação...');
        (window as any).segmenter = await pipeline('image-segmentation', 'Xenova/u2net');
    }
    const segmenter = (window as any).segmenter;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Não foi possível obter o contexto do canvas');
    
    resizeImageIfNeeded(canvas, ctx, imageElement);
    
    const imageDataForModel = canvas.toDataURL('image/jpeg');
    
    console.log('Processando com o modelo de segmentação...');
    const result = await segmenter(imageDataForModel);
    
    if (!result || !Array.isArray(result) || result.length === 0 || !result[0].mask) {
      throw new Error('Resultado de segmentação inválido');
    }

    const { mask } = result[0];
    
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = canvas.width;
    outputCanvas.height = canvas.height;
    const outputCtx = outputCanvas.getContext('2d');
    if (!outputCtx) throw new Error('Não foi possível obter o contexto do canvas de saída');
    
    outputCtx.drawImage(canvas, 0, 0);
    
    const outputImageData = outputCtx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const { data } = outputImageData;
    
    for (let i = 0; i < mask.data.length; i++) {
      data[i * 4 + 3] = mask.data[i] * 255;
    }
    
    outputCtx.putImageData(outputImageData, 0, 0);
    console.log('Máscara aplicada com sucesso');
    
    return new Promise((resolve, reject) => {
      outputCanvas.toBlob(
        (blob) => blob ? resolve(blob) : reject(new Error('Falha ao criar blob')),
        'image/png'
      );
    });
};

export const loadImageAndRemoveBg = (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = async () => {
      try {
        const blob = await processImage(img);
        resolve(URL.createObjectURL(blob));
      } catch (error) {
        console.error('Falha ao processar imagem:', error);
        reject(error);
      }
    };
    img.onerror = (err) => {
        console.error('Falha ao carregar imagem:', err);
        reject(err);
    };
    img.src = imageUrl;
  });
};
