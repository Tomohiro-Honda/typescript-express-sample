import dotenv from 'dotenv';

dotenv.config();

export const MYSQL_CONFIG = {
  HOST: process.env.DB_HOST,
  PORT: Number(process.env.DB_PORT),
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DATABASE: process.env.DB_DATABASE_NAME,
  CONNECTION_LIMIT: Number(process.env.DB_CONNECTION_LIMIT),
};
