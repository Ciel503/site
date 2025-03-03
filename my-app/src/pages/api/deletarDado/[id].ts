import { NextApiRequest, NextApiResponse } from 'next';
import database from "../../../dataBase/database";
import User from '../../../dataBase/schema/UserSchema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { id } = req.query;

  try {
    const connected = await database.connect();
    if (!connected) {
      console.error("Falha ao conectar com o banco de dados");
      return res.status(500).json({ message: 'Erro de conexão com o banco de dados' });
    }

    try {
      const resultado = await User.findByIdAndDelete(id);
      await database.disconnect();

      if (!resultado) {
        return res.status(404).json({ message: 'Item não encontrado' });
      }

      return res.status(200).json({ message: 'Item deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar:', error);
      await database.disconnect();
      return res.status(500).json({ message: 'Erro ao deletar item' });
    }
  } catch (error) {
    console.error('Erro ao conectar:', error);
    return res.status(500).json({ message: 'Erro de conexão com o banco de dados' });
  }
} 