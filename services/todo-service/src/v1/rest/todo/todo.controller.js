import _ from 'lodash';
import AppController from '../_core/app.controller';
import { _extend } from 'util';

/**
 * Todo class
 */
class TodoController extends AppController {
    /**
     * @param {Model} model The default model object
     * for the controller. Will be required to create
     * an instance of the controller¬
     */
    constructor(model) {
        super(model);
        this.model = model;
    }

}

export default TodoController;
