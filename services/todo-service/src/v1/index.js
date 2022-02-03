import { Router } from 'express';

import todo from './rest/todo/todo.route';

const router = Router();

router.use(todo);

export default router;
