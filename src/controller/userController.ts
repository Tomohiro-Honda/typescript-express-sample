import { RequestHandler } from 'express';
import { User } from '../models/user.js';
import { getUserAllService, getUserService, postUserService } from '../services/userService.js';

const userList: User[] = [];

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

  const result = await postUserService(name, age, email, password, department);

  if (result !== 1) {
    console.log(result);
    next(new Error(`server error`));
  }

  if (!res.headersSent) {
    res.status(201).json({ message: 'succeed create new User.' });
  }
};

/* ID指定でユーザー情報取得 */
export const getUser: RequestHandler = async (req, res, next): Promise<void> => {
  const searchId = req.params.id;

  const result = await getUserService(searchId);

  if (result === null) {
    next(new Error(`server error`));
  } else if (result === undefined) {
    next(new Error(`id "${searchId}" is not foud.`));
  } else {
    const serchUser = new User(result.id, result.name, result.age, result.email);
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
      res.json({ users: result });
    }
  }
};

export const updateUser: RequestHandler<{ id: string }> = (req, res) => {
  // const searchId = req.params.id;
  // const updateText = (req.body as { text: string }).text;
  // const updateIndex = userList.findIndex((todo) => todo.id === searchId);
  // if (updateIndex < 0) {
  //   throw new Error(`id "${searchId}" is not foud.`);
  // }
  // userList[updateIndex] = new User(searchId, updateText);
  // res.json({ message: 'updated User.', updatedTodo: userList[updateIndex] });
};

export const deleteUser: RequestHandler<{ id: string }> = (req, res) => {
  // const searchId = req.params.id;
  // const deleteIndex = userList.findIndex((todo) => todo.id === searchId);
  // if (deleteIndex < 0) {
  //   throw new Error(`id "${searchId}" is not foud.`);
  // }
  // const deletedTodo = userList[deleteIndex];
  // userList.splice(deleteIndex, 1);
  // res.json({ message: 'delete Todo.', deletedTodo: deletedTodo });
};
