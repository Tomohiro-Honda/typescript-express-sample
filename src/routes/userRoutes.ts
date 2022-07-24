import { Router } from 'express';
import {
  createUser,
  getUser,
  getUserList,
  updateUser,
  deleteUser,
} from '../controller/userController.js';

const router = Router();

router.post('/', createUser);

router.get('/:id([0-9]+)', getUser);

router.get('/all', getUserList);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;
