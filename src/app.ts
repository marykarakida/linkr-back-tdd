import express from 'express';
import cors from 'cors';
import { loadEnv } from './config/env';

loadEnv();

const app = express();

app.use(cors());

export default app;
