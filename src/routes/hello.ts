import { Router } from 'express';
import { getHello } from '../controller/hello.js';

const router = Router();

router.get('/', getHello);

export default router;
