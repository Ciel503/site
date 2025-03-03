import { NextApiRequest, NextApiResponse } from 'next';
import database from "../../dataBase/database";
import User from '../../dataBase/schema/UserSchema';

const consutaDados = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const connected = await database.connect();
        if (!connected) {
            console.error("Falha ao conectar com o banco de dados");
            return res.status(500).json({ error: 'Erro de conexão com o banco de dados' });
        }

        try {
            const dados = await User.find({});
            await database.disconnect();
            return res.status(200).json(dados);
        } catch (queryError: any) {
            console.error("Erro ao consultar dados:", queryError);
            await database.disconnect();
            return res.status(500).json({ 
                error: 'Erro ao consultar dados',
                details: queryError.message 
            });
        }
    } catch (error: any) {
        console.error("Erro crítico:", error);
        await database.disconnect();
        return res.status(500).json({ 
            error: 'Erro interno do servidor',
            details: error.message 
        });
    }
}

export default consutaDados;

