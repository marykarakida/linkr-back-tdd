import { Router } from 'express';

import { authRouter } from '@/modules/user/authRouter';

const router = Router();

router.use('/auth', authRouter);

export default router;
