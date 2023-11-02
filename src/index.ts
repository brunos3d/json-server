import fs from 'fs';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json({ limit: '50mb' }));

app.get('*', (req, res) => {
  console.log(`[GET] Received GET request from ${req.url}`);
  res.status(200).send('Hello World!');
});

let count = 0;

app.post('*', (req, res) => {
  const fileId = `data-${count++}`;
  const filename = `${fileId}.json`;
  const filePath = `storage/${filename}`;
  fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2));
  console.log(`[POST] Saved POST request [${fileId}] from ${req.url} to ${filePath}`);
});

app.listen(process.env.PORT || 5555, () => {
  console.log(`Server listening on port http://localhost:${process.env.PORT || 5555}`);
});
