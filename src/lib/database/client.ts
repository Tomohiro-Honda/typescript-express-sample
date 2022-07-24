import { promisify } from 'util';
import mysql, { ResultSetHeader } from 'mysql2';
import { MYSQL_CONFIG } from '../../config/mysqlconf.js';
import PoolConnection from 'mysql2/typings/mysql/lib/PoolConnection.js';

const pool = mysql.createPool({
  host: MYSQL_CONFIG.HOST,
  port: MYSQL_CONFIG.PORT,
  user: MYSQL_CONFIG.USER,
  password: MYSQL_CONFIG.PASSWORD,
  database: MYSQL_CONFIG.DATABASE,
  connectionLimit: MYSQL_CONFIG.CONNECTION_LIMIT,
});

const dBClientBase = {
  getConnection: promisify(pool.getConnection).bind(pool),
  query: promisify(pool.query).bind(pool),
  release: (connection: PoolConnection) => connection.release(),
  end: promisify(pool.end).bind(pool),
};

export const dbClient = {
  // 検索のクエリ
  executeFindQuery: async <T>(sqlStr: string, vals: any[], resultType: T): Promise<T[] | null> => {
    const result = (await dBClientBase.query({
      sql: sqlStr,
      values: vals,
    })) as typeof resultType[] | null;
    return result;
  },

  // INSERT, UPDATE, DELETE 共用
  executeDMLQuery: async (sqlStr: string, vals: any[]): Promise<ResultSetHeader | null> => {
    const result = (await dBClientBase.query({
      sql: sqlStr,
      values: vals,
    })) as ResultSetHeader;

    return result;
  },
};
