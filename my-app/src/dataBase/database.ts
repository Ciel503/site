import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const dbname = "mongoapp";
const url = `mongodb+srv://luciel:${process.env.DB_PWD}@cluster0.tbjr2.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster0`;

let isConnected = false;

const connect = async () => {
    if (isConnected) {
        return true;
    }

    try {
        await mongoose.connect(url);
        isConnected = true;
        console.log("Conectado com sucesso ao MongoDB");
        return true;
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
        isConnected = false;
        return false;
    }
}

const disconnect = async () => {
    if (!isConnected) {
        return true;
    }

    try {
        await mongoose.disconnect();
        isConnected = false;
        console.log("Desconectado com sucesso do MongoDB");
        return true;
    } catch (error) {
        console.error("Erro ao desconectar do MongoDB:", error);
        return false;
    }
}

const database = {
    connect,
    disconnect,
    isConnected: () => isConnected
}

export default database;