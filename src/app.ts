import express from 'express';

const app: express.Express = express();

// CORSの許可
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// body-parserに基づいた着信リクエストの解析
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GetとPostのルーティング
const router: express.Router = express.Router();
router.get('/', (req: express.Request, res: express.Response) => {
  console.log(process.env.NODE_ENV);
  const word = 'HELLO!!!';
  res.send(word);
});
router.post('/api/postTest', (req: express.Request, res: express.Response) => {
  res.send(req.body);
});
app.use(router);

// envファイル定義のポートでAPIサーバ起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
