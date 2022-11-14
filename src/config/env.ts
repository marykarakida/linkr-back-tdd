import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

export function loadEnv() {
  const currentEnv = dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });

  if (currentEnv.error) {
    throw new Error(currentEnv.error.message);
  }

  dotenvExpand.expand(currentEnv);
}
