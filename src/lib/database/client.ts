import { promisify } from 'util';
import mysql from 'mysql2';
import { MYSQL_CONFIG } from '../../config/mysqlconf.js';

export const getDBClient = () => {
  const pool = mysql.createPool({
    host: MYSQL_CONFIG.HOST,
    port: MYSQL_CONFIG.PORT,
    user: MYSQL_CONFIG.USER,
    password: MYSQL_CONFIG.PASSWORD,
    database: MYSQL_CONFIG.DATABASE,
  });

  const dbClient = {
    query: promisify(pool.query).bind(pool),
    end: promisify(pool.end).bind(pool),
  };

  return dbClient;
};
