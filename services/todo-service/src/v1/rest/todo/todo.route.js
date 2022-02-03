import { Router } from 'express';
import {Todo} from './todo.model';
import response from '../../../middleware/response';
import auth from '../../middleware/auth';
import TodoController from './todo.controller';

const router = Router();

const todoCtrl = new TodoController(Todo);

router.route('/todo')
    .post(auth, todoCtrl.create, response)
    .get(todoCtrl.find, response);
router.param('id', todoCtrl.id, response);
router.route('/todo/:id')
    .get(todoCtrl.findOne, response)
    .put(auth, todoCtrl.update, response)
    .delete(auth, todoCtrl.delete, response);

export default router;
