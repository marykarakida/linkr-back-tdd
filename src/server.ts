import { app, init } from './infra/http/app';

const PORT = process.env.PORT || 4000;

init().then(() => {
  app.listen(PORT, () => {
    console.log('Server running on PORT', PORT);
  });
});
