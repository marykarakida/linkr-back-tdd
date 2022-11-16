import { Router } from 'express';

import { signUpControllerFactory } from '@/modules/user/signUp';

const authRouter = Router();

authRouter.post('/sign-up', (req, res) => signUpControllerFactory().execute(req, res));

export { authRouter };
