import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { loadEnv } from '@/config/env';
import { connectDb, disconnectDb } from '@/config/prisma';
import router from './api/index';

loadEnv();

const app = express();

app.use(cors());
app.use(json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.json({ message: 'App is up and running!' }));

app.use(router);

function init() {
  connectDb();
  return Promise.resolve(app);
}

async function close() {
  await disconnectDb();
}

const PORT = process.env.PORT || 4000;

init().then(() => {
  app.listen(PORT, () => {
    console.log('Server running on PORT', PORT);
  });
});

export { app, init, close };
