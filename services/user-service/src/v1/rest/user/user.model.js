/**
 * User Schema
 */
import mongoose, { Schema } from 'mongoose';
import UserProcessor from './user.processor';
import UserValidation from './user.validation';
import AppSchema from '../_core/app.model';

const UserModel = new AppSchema({
    user: {
        type: String,
        trim: true
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    active: {
        type: Boolean,
        default: true,
    },
    deleted: {
        type: Boolean,
        default: false,
        select: false,
    },
}, {
    autoCreate: true,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


UserModel.statics.fillables = [];

/**
 * @return {Object} The validator object with the specified rules.
 */
UserModel.statics.getValidator = () => {
    return new UserValidation();
};

/**
 * @param {Model} model required for response
 * @return {Object} The processor class instance object
 */
UserModel.statics.getProcessor = (model) => {
    return new UserProcessor(model);
};
/**
 * @typedef UserModel
 */
export const User = mongoose.models.User || mongoose.model('User', UserModel);

