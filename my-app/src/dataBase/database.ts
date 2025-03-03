import mongoose from "mongoose";

mongoose.set("strictQuery",true);

const dbname = "mongoapp";
const url = `mongodb+srv://luciel:${process.env.DB_PWD}@cluster0.tbjr2.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster0`;

const connect = async () => {
    try {
        await mongoose.connect(url);
        console.log("Conectado com sucesso ao MongoDB");
        return true;
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
        return false;
    }
}

const disconnect = async () => {
    try {
        await mongoose.disconnect();
        console.log("Desconectado com sucesso do MongoDB");
        return true;
    } catch (error) {
        console.error("Erro ao desconectar do MongoDB:", error);
        return false;
    }
}

const database = {
    connect,
    disconnect
}

export default database;