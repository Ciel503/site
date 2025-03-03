import { v2 as cloudinary } from 'cloudinary';

// Verifica se as variáveis de ambiente estão definidas
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error('Erro: Variáveis de ambiente do Cloudinary não configuradas:', {
    cloudName: cloudName ? 'Configurado' : 'Não configurado',
    apiKey: apiKey ? 'Configurado' : 'Não configurado',
    apiSecret: apiSecret ? 'Configurado' : 'Não configurado'
  });
  throw new Error('Configurações do Cloudinary ausentes');
}

// Configura o Cloudinary com as variáveis de ambiente
cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret
});

export default cloudinary; 