import { Router } from 'express';

import user from './rest/user/user.route';


const router = Router();

router.use(user);

export default router;
