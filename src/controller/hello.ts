import { RequestHandler } from 'express';

export const getHello: RequestHandler = (req, res) => {
  res.json({ message: 'Hello ~' });
};
