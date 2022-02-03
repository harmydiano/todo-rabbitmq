import { Router } from 'express';

import auth from './rest/auth/auth.route';

const router = Router();

router.use(auth);

export default router;
