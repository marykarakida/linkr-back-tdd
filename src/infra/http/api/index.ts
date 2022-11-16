import { Router } from 'express';

import { authRouter } from '@/modules/user/infra/http/routes';

const router = Router();

router.use('/auth', authRouter);

export default router;
