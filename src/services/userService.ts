import {
  findAllUser,
  findUserById,
  registerUser,
  updateUser,
  deleteUser,
} from '../lib/database/userQueryExecutor.js';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';

export const getUserService = async (id: string): Promise<User | undefined | null> => {
  const serchResult: User[] | null = await findUserById(id);

  if (serchResult === null) {
    return null;
  }

  const content = serchResult[0] as User | undefined;
  return content;
};

export const getUserAllService = async (): Promise<User[] | undefined | null> => {
  const serchResult: User[] | null = await findAllUser();

  const content = serchResult;
  return content;
};

export const createUserService = async (
  name: string,
  age: number,
  email: string,
  password: string,
  department: string,
): Promise<number> => {
  //  データチェック等をここで入れる
  const salt = await bcrypt.genSalt(10, 'b');
  const hashPW = await bcrypt.hash(password, salt);
  return await registerUser(name, age, email, hashPW, department);
};

export const updateUserService = async (
  id: number,
  name: string,
  age: number,
  email: string,
  department: string,
): Promise<number> => {
  //  データチェック等をここで入れる

  return await updateUser(id, name, age, email, department);
};

export const deleteUserService = async (id: number): Promise<number> => {
  return await deleteUser(id);
};
