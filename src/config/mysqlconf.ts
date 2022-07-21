export const MYSQL_CONFIG = {
  HOST: process.env.DB_HOST || 'db',
  PORT: Number(process.env.DB_PORT) || 3306,
  USER: process.env.USER || 'root',
  PASSWORD: process.env.DB_PASSWORD || 'root',
  DATABASE: process.env.DB_DATABASE_NAME || 'next-api-db',
};
