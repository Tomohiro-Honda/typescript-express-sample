import internal from 'stream';
import { findUserById } from '../lib/database/userQueryExecutor.js';

type userContent = {
  id: number;
  name: string;
  age: number;
  email: string;
};

export const getUserService = async (id: string): Promise<userContent | undefined | null> => {
  const serchResult = await findUserById(id);
  let content = null;
  if (serchResult === null) {
    return content;
  } else {
    content = serchResult[0];
  }
  return content;
};
