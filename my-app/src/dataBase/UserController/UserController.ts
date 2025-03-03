import User from "../schema/UserSchema";
import database from "../database";

interface QueryUser {
    url: string;
    descricao: string;
}

const saveUser = async (queryUser: QueryUser): Promise<any> => {
    console.log('Dados recebidos no controller:', queryUser);
    
    if(!database.connect()) {
        throw new Error('Falha na conexão com o banco de dados');
    }

    if (!queryUser.url || !queryUser.descricao) {
        throw new Error('URL e descrição são obrigatórios');
    }

    const newUser = new User({
        url: queryUser.url,
        descricao: queryUser.descricao
    });

    return await newUser.save();
}

const UserController = {
    saveUser
}

export default UserController; 