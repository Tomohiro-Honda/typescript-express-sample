import express, { Request, Response, NextFunction } from 'express';
import todoRoutes from './routes/todos.js';

const app: express.Express = express();

// body-parserに基づいたリクエストの解析
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORSの許可
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// envファイル定義のポートでAPIサーバ起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

/* '/todos' へのリクエストはtodoRoutesのルーティング設定を利用する*/
app.use('/todos', todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
  next();
});
