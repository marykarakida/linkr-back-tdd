import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { loadEnv } from './config/env';

loadEnv();

const app = express();

app.use(cors());
app.use(json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.json({ message: 'App is up and running!' }));

export default app;
