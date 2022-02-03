/**
 * Todo Schema
 */
import mongoose, { Schema } from 'mongoose';
import TodoProcessor from './todo.processor';
import TodoValidation from './todo.validation';
import AppSchema from '../_core/app.model';

const TodoModel = new AppSchema({
    user: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    text: {
        type: String
    },
    deleted: {
        type: Boolean,
        default: false,
        select: false,
    },
}, {
    autoCreate: true,
    timestamps: true,
    toJSON: { virtuals: true }
});

TodoModel.statics.fillables = [];
TodoModel.statics.returnDuplicate = false;
TodoModel.statics.uniques = [];
TodoModel.statics.hiddenFields = ['deleted'];

/**
 * @return {Object} The validator object with the specified rules.
 */
TodoModel.statics.getValidator = () => {
    return new TodoValidation();
};

/**
 * @param {Model} model required for response
 * @return {Object} The processor class instance object
 */
TodoModel.statics.getProcessor = (model) => {
    return new TodoProcessor(model);
};
/**
 * @typedef TodoModel
 */
export const Todo = mongoose.model('Todo', TodoModel);
