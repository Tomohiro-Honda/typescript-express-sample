import { RequestHandler } from 'express';
import { User } from '../models/user.js';
import {
  getUserAllService,
  getUserService,
  createUserService,
  updateUserService,
  deleteUserService,
} from '../services/userService.js';

/* 新規ユーザー追加 */
export const createUser: RequestHandler = async (req, res, next): Promise<void> => {
  const postData = req.body as {
    name: string;
    age: string;
    email: string;
    password: string;
    department: string;
  };
  const { name, age, email, password, department } = {
    ...postData,
    age: Number(postData.age),
  };

  const result = await createUserService(name, age, email, password, department);

  if (result !== 1) {
    next(new Error(`server error`));
  }

  if (!res.headersSent) {
    res.status(201).json({ message: 'succeed create new User.' });
  }
};

/* ID指定でユーザー情報取得 */
export const getUser: RequestHandler<{ id: string }> = async (req, res, next): Promise<void> => {
  const searchId = req.params.id;

  const result = await getUserService(searchId);

  if (result === null) {
    next(new Error(`server error`));
  } else if (result === undefined) {
    res.status(404).json({ message: `id "${searchId}" is not foud.` });
  } else {
    const serchUser = new User(result.id, result.name, result.age, result.email, result.department);
    if (!res.headersSent) {
      res.json({ user: serchUser });
    }
  }
};

/* ユーザーリスト取得 */
export const getUserList: RequestHandler = async (req, res, next): Promise<void> => {
  const result = await getUserAllService();

  if (result === null) {
    next(new Error(`server error`));
  } else {
    const serchUser = result;
    if (!res.headersSent) {
      res.json({ users: serchUser });
    }
  }
};

export const updateUser: RequestHandler<{ id: string }> = async (req, res, next): Promise<void> => {
  const updateId = Number(req.params.id);

  const postData = req.body as {
    name: string;
    age: string;
    email: string;
    password: string;
    department: string;
  };
  const { id, name, age, email, department } = {
    id: updateId,
    ...postData,
    age: Number(postData.age),
  };

  const result = await updateUserService(id, name, age, email, department);

  if (result === -1) {
    next(new Error(`server error`));
  } else if (result === 0) {
    res.status(404).json({ message: `id "${updateId}" is not foud.` });
  }

  if (!res.headersSent) {
    res.status(201).json({ message: 'succeed update User info.' });
  }
};

export const deleteUser: RequestHandler<{ id: string }> = async (req, res, next): Promise<void> => {
  const deleteId = Number(req.params.id);
  const result = await deleteUserService(deleteId);
  if (result === -1) {
    next(new Error(`server error`));
  } else if (result === 0) {
    res.status(404).json({ message: `id "${deleteId}" is not foud.` });
  }

  if (!res.headersSent) {
    res.status(201).json({ message: 'succeed update User info.' });
  }
};
