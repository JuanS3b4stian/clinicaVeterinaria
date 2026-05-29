import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_URL;

if (!mongoUri) {
  console.error('MONGODB_URI or MONGODB_URL not set');
  process.exit(1);
}

const run = async () => {
  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000, family: 4 });
    console.log('Conectado a MongoDB');

    const col = mongoose.connection.db.collection('veterinaries');

    const res = await col.updateMany({ token: null }, { $unset: { token: '' } });
    console.log(`Documentos modificados: ${res.modifiedCount}`);
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

run();
