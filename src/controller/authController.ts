import { RequestHandler } from 'express';
import { loginService } from '../services/authService.js';

export const signIn: RequestHandler = async (req, res, next): Promise<void> => {
  const postData = req.body as {
    email: string;
    password: string;
  };
  const email = postData.email;
  const password = postData.password;

  const body = await loginService(email, password);

  if (body === null) {
    next(new Error(`server error`));
  } else if (body.user === undefined) {
    res.status(401).json({ message: 'failed authentication.' });
  } else {
    res.json(body);
  }
};

export const signOut: RequestHandler = async (req, res, next): Promise<void> => {
  const id = req.body.id;
  const pw = req.body.password;
};
