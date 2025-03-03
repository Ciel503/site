import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import cloudinary from '../../utils/cloudinary';
import { promisify } from 'util';

// Configuração do multer para armazenamento temporário
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite de 5MB
  },
});

// Função auxiliar para processar o upload
const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export default async function handler(req: NextApiRequest & { file?: Express.Multer.File }, res: NextApiResponse) {
  // Log para debug
  console.log('Método da requisição:', req.method);
  console.log('Headers:', req.headers);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    // Processa o upload do arquivo
    console.log('Iniciando processamento do upload...');
    await runMiddleware(req, res, upload.single('imagem'));
    console.log('Middleware processado');

    if (!req.file) {
      console.log('Nenhum arquivo encontrado na requisição');
      return res.status(400).json({ error: 'Nenhuma imagem foi enviada' });
    }

    console.log('Arquivo recebido:', {
      mimetype: req.file.mimetype,
      size: req.file.size,
      originalname: req.file.originalname
    });

    // Converte o buffer da imagem para base64
    const base64Image = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${base64Image}`;
    console.log('Imagem convertida para base64');

    // Verifica se as credenciais do Cloudinary estão configuradas
    console.log('Verificando configuração do Cloudinary:', {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME ? 'Configurado' : 'Não configurado',
      apiKey: process.env.CLOUDINARY_API_KEY ? 'Configurado' : 'Não configurado',
      apiSecret: process.env.CLOUDINARY_API_SECRET ? 'Configurado' : 'Não configurado'
    });

    // Faz upload para o Cloudinary
    console.log('Iniciando upload para Cloudinary...');
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'minha-aplicacao',
    });
    console.log('Upload para Cloudinary concluído:', result.secure_url);

    res.status(200).json({
      message: 'Upload realizado com sucesso',
      url: result.secure_url,
      descricao: req.body.descricao
    });
  } catch (error: any) {
    console.error('Erro detalhado:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
      details: error
    });

    // Retorna uma mensagem de erro mais detalhada
    res.status(500).json({ 
      error: 'Erro ao fazer upload da imagem',
      details: error.message,
      type: error.name
    });
  }
}

export const config = {
  api: {
    bodyParser: false, // Desabilita o body-parser padrão do Next.js
  },
}; 