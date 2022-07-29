import { Router } from 'express';
import { signIn, signOut } from '../controller/authController.js';

const router = Router();

router.post('/signin', signIn);

router.post('/signout', signOut);

export default router;
