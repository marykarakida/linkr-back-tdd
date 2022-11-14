import express from 'express';
import { loadEnv } from './config/env';

const app = express();

loadEnv();

export default app;
