import { Router } from 'express';
import { createTodo, getTodoList, updateTodo, deleteTodo } from '../controller/todos.js';

const router = Router();

router.post('/', createTodo);

router.get('/', getTodoList);

router.patch('/:id', updateTodo);

router.delete('/:id', deleteTodo);

export default router;
