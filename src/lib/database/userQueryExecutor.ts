import { ResultSetHeader } from 'mysql2';
import { User } from '../../models/user.js';
import { dbClient } from './client.js';

export const findUserById = async (id: string): Promise<User[] | null> => {
  let result: User[] | null = null;
  try {
    const sql = 'SELECT id, name, age, email, department FROM t_employee WHERE ID = ?';
    const row = await dbClient.executeFindQuery(sql, [id], User);
    result = row as User[] | null;
  } catch (err) {
    console.log(err);
  }

  return result;
};

export const findAllUser = async (): Promise<User[] | null> => {
  let result: User[] | null = null;
  try {
    const sql = 'SELECT id, name, age, email, department FROM t_employee WHERE retirement_flag = ?';
    const row = await dbClient.executeFindQuery(sql, [0], User);
    result = row as User[] | null;
  } catch (err) {
    console.log(err);
  }

  return result;
};

export const registerUser = async (
  name: string,
  age: number,
  email: string,
  password: string,
  department: string,
): Promise<number> => {
  let status = 0;
  try {
    const sql =
      'INSERT INTO t_employee(name, age, email, password, department, hire_date) values (?, ?, ?, ?, ?, CURRENT_DATE())';
    const queryResult: ResultSetHeader | null = await dbClient.executeDMLQuery(sql, [
      name,
      age,
      email,
      password,
      department,
    ]);

    if (queryResult) {
      console.log(queryResult);
      status = 1;
    }
  } catch (err) {
    console.log(err);
  }

  return status;
};
