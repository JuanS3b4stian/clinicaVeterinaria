import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_URL;

if (!mongoUri) {
  console.error('MONGODB_URI or MONGODB_URL not set in environment');
  process.exit(1);
}

const run = async () => {
  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000, family: 4 });
    console.log('Conectado a MongoDB');

    const col = mongoose.connection.db.collection('veterinaries');

    // List existing indexes
    const indexes = await col.indexes();
    console.log('Índices actuales:', indexes.map(i => i.name));

    // Try to drop old token index if present
    const tokenIndexName = indexes.find(i => i.key && i.key.token) ? 'token_1' : null;
    if (tokenIndexName) {
      try {
        await col.dropIndex(tokenIndexName);
        console.log('Índice token_1 eliminado');
      } catch (err) {
        console.warn('No se pudo eliminar token_1:', err.message);
      }
    }

    // Recreate unique+sparse index
    try {
      await col.createIndex({ token: 1 }, { unique: true, sparse: true });
      console.log('Índice token (unique+sparse) creado correctamente');
    } catch (err) {
      console.error('Error creando índice token:', err.message);
    }

  } catch (error) {
    console.error('Error de conexión o en la operación:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

run();
