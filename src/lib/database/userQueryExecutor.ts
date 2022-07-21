import { getDBClient } from './client.js';

export const findUserById = async (id: string) => {
  let result = null;
  const dbClient = getDBClient();
  try {
    const sql = 'SELECT id, name, age, email FROM t_employee WHERE ID = ?';
    const row = (await dbClient.query({
      sql: sql,
      values: [id],
    })) as any[];
    result = row;
  } catch (err) {
    console.log(err);
  } finally {
    await dbClient.end();
  }
  return result;
};
