import fs from 'fs';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json({ limit: '50mb' }));

app.get('*', (req, res) => {
  res.status(200).send('Hello World!');
});

let count = 0;

app.post('*', (req, res) => {
  fs.writeFileSync(`storage/data-${count++}.json`, JSON.stringify(req.body, null, 2));
});

app.listen(process.env.PORT || 5555, () => {
  console.log(`Server listening on port http://localhost:${process.env.PORT || 5555}`);
});
