import mongoose from "mongoose";   

const conectarDB = async () => { // Esperar respuesta de la conexion
    try {
        const mongoURI = process.env.MONGODB_URI || process.env.MONGODB_URL;
        if (!mongoURI) throw new Error('MONGODB_URI or MONGODB_URL no definida');

        const conn = await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000,
            family: 4 // Ayuda a resolver mas rapido en Windows
        }); // Establece la conexion -> Lee variables de entorno
        console.log(`MongoDB conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error al conectar MongoDB: ${error.message}`);
        process.exit(1); // Terminar el proceso con error
    }
};

export default conectarDB;