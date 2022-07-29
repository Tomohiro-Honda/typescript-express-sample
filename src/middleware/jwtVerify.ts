import { RequestHandler } from 'express';
import { verifyToken } from '../lib/auth/auth.js';

export const authByToken: RequestHandler = (req, res, next) => {
  // リクエストヘッダーからトークンの取得
  let token = '';
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1];
  } else {
    return next('token none');
  }

  const decoded = verifyToken(token);
  if (decoded) {
    console.log(decoded);
    next();
  } else {
    res.status(403).json({ message: 'unauthorized' });
  }
};
