import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

export function loadEnv() {
  const currentEnv = dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });
  dotenvExpand.expand(currentEnv);
}
