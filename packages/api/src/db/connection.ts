import mongoose from 'mongoose';

export const initDb = async (): Promise<any> => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URL);
    console.log('DB connected');
    return db;
  } catch (error) {
    console.error('DB connection failed', error);
    process.exit(1);
  }
};
