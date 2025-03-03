import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '../../utils/cloudinary';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Tenta acessar as configurações do Cloudinary
    const configs = {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET
    };

    // Tenta fazer uma chamada simples ao Cloudinary
    const testResult = await cloudinary.api.ping();

    res.status(200).json({
      message: 'Conexão com Cloudinary OK',
      configs,
      testResult
    });
  } catch (error: any) {
    res.status(500).json({
      error: 'Erro ao testar Cloudinary',
      message: error.message,
      configs: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ? 'Configurado' : 'Não configurado',
        apiKey: process.env.CLOUDINARY_API_KEY ? 'Configurado' : 'Não configurado',
        apiSecret: process.env.CLOUDINARY_API_SECRET ? 'Configurado' : 'Não configurado'
      }
    });
  }
} 