import mongoose from 'mongoose';
import 'dotenv/config';

export const mongooseConnect = async () => {
  const connectionString = process.env.MONGO_URI;

  if (!connectionString) {
    throw new Error('Database connection string is not provided!');
  }

  try {
    await mongoose.connect(connectionString);
    console.log(`Successfully connected to the database!`);
  } catch (error) {
    console.error('Error connecting to the database: ', error);
    throw error;
  }
};
