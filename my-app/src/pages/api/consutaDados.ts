import { NextApiRequest, NextApiResponse } from 'next';
import database from "../../dataBase/database";
import User from "../../dataBase/schema/UserSchema";

const consutaDados = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Verifica se já está conectado
        if (!database.isConnected()) {
            const connected = await database.connect();
            if (!connected) {
                console.error("Falha ao conectar com o banco de dados");
                return res.status(500).json({ error: 'Erro de conexão com o banco de dados' });
            }
        }

        const dados = await User.find({});
        return res.status(200).json(dados);
    } catch (error: any) {
        console.error("Erro ao consultar dados:", error);
        return res.status(500).json({ 
            error: 'Erro ao consultar dados',
            details: error.message 
        });
    }
}

export default consutaDados;

