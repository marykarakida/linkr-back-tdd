/* eslint-disable arrow-body-style */
import { Router } from 'express';

import { validateBody } from '@/middlewares/schemaMiddleware';
import { signUpControllerFactory } from '@/modules/user/signUp';

const authRouter = Router();

authRouter.route('/sign-up').post(validateBody.validate('createUserSchema'), (req, res) => {
  return signUpControllerFactory().execute(req, res);
});

export { authRouter };
