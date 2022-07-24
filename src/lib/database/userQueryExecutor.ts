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

export const updateUser = async (
  id: number,
  name: string,
  age: number,
  email: string,
  department: string,
): Promise<number> => {
  let status = 0; /*-1 = error, 0 = not found, 1 = success*/
  try {
    const sql = 'UPDATE t_employee SET name = ?, age = ?, email = ?, department = ? WHERE id = ?';
    const queryResult: ResultSetHeader | null = await dbClient.executeDMLQuery(sql, [
      name,
      age,
      email,
      department,
      id,
    ]);

    console.log(queryResult);

    if (!queryResult) {
      status = -1;
    } else {
      if (queryResult.affectedRows === 1) {
        status = 1;
      } else if (queryResult.affectedRows === 0) {
        status = 0;
      }
    }
  } catch (err) {
    status = -1;
    console.log(err);
  }

  return status;
};

export const deleteUser = async (id: number): Promise<number> => {
  let status = 0; /*-1 = error, 0 = not found, 1 = success*/
  try {
    const sql = 'UPDATE t_employee SET retirement_flag = ? WHERE id = ?';
    const queryResult: ResultSetHeader | null = await dbClient.executeDMLQuery(sql, [1, id]);

    console.log(queryResult);

    if (!queryResult) {
      status = -1;
    } else {
      if (queryResult.affectedRows === 1) {
        status = 1;
      } else if (queryResult.affectedRows === 0) {
        status = 0;
      }
    }
  } catch (err) {
    status = -1;
    console.log(err);
  }

  return status;
};
