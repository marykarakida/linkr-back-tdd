import express, { json } from 'express';
import cors from 'cors';
import { loadEnv } from './config/env';

loadEnv();

const app = express();

app.use(cors());
app.use(json());

export default app;
