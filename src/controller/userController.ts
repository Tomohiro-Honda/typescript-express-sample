import { RequestHandler } from 'express';
import { User } from '../models/user.js';
import { getUserService } from '../services/userService.js';

const userList: User[] = [];

/* 新規ユーザー追加 */
export const createUser: RequestHandler = (req, res) => {
  // const text = (req.body as { text: string }).text;
  // const newUser = new User(Math.random().toString(), text);
  // userList.push(newUser);
  // res.status(201).json({ message: 'created new Todo.', createdTodo: newUser });
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
export const getUserList: RequestHandler = (req, res) => {
  // res.json({ userList: userList });
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
