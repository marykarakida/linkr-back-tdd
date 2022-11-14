import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

export function loadEnv() {
  const path = process.env.NODE_ENV ? `./.env.${process.env.NODE_ENV}` : './.env';
  const currentEnv = dotenv.config({ path });

  if (currentEnv.error) {
    throw new Error(currentEnv.error.message);
  }

  dotenvExpand.expand(currentEnv);
}
