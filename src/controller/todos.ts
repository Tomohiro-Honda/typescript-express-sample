import { RequestHandler } from 'express';
import { Todo } from '../models/todo.js';

const todoList: Todo[] = [];

export const createTodo: RequestHandler = (req, res) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);
  todoList.push(newTodo);
  res.status(201).json({ message: 'created new Todo.', createdTodo: newTodo });
};

export const getTodoList: RequestHandler = (req, res) => {
  res.json({ todoList: todoList });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res) => {
  const searchId = req.params.id;
  const updateText = (req.body as { text: string }).text;
  const updateIndex = todoList.findIndex((todo) => todo.id === searchId);

  if (updateIndex < 0) {
    throw new Error(`id "${searchId}" is not foud.`);
  }
  todoList[updateIndex] = new Todo(searchId, updateText);

  res.json({ message: 'updated Todo.', updatedTodo: todoList[updateIndex] });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res) => {
  const searchId = req.params.id;
  const deleteIndex = todoList.findIndex((todo) => todo.id === searchId);

  if (deleteIndex < 0) {
    throw new Error(`id "${searchId}" is not foud.`);
  }

  const deletedTodo = todoList[deleteIndex];
  todoList.splice(deleteIndex, 1);

  res.json({ message: 'delete Todo.', deletedTodo: deletedTodo });
};
