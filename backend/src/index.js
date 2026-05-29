import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from './config/db.js';
import veterinaryRoutes from './routes/veterinaryRoutes.js';

// Cargar variables de entorno
dotenv.config();

// Conectar base de datos
conectarDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleaware para parsear JSON
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));

// Rutas
app.use('/api/veterinarios', veterinaryRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ mensaje: 'Servidor funcionando correctamente',
        entorno: process.env.NODE_ENV || 'desarrollo'
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});