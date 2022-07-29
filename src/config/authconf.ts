import dotenv from 'dotenv';

dotenv.config();

export const AUTH_CONFIGH = {
  SECRET_KEY: process.env.SECRET_KEY as string,
  PUBLIC_KEY: process.env.PUBLIC_KEY as string,
  ALGORITHM: process.env.ALGORITHM as string,
  EXPIRES: process.env.EXPIRES as string,
};
