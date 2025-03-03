import { NextApiRequest, NextApiResponse } from 'next';
import userController from "../../../src/dataBase/UserController/UserController";

type ResponseData = {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    try {
      const data = await userController.saveUser(req.body);
      res.status(200).json({ success: true, data });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, error: error.message });
      } else {
        res.status(500).json({ success: false, error: 'Erro desconhecido' });
      }
    }
  } else {
    res.status(405).json({ success: false, message: 'Método não permitido' });
  }
} 