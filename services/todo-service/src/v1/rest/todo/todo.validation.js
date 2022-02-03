// import AppValidation from '../_core/app.validation';
import _ from 'lodash';
import * as Joi from 'joi';
import config from '../../../../config/default';
import AppError from '../../../lib/api/app-error';

/**
 * The Todo Validation class
 */
class TodoValidation {
	/**
     * @param {Object} body The object to validate
     * @return {Object} Validator
     */
	async create(body = {}) {
		const schema = Joi.object({
			user: Joi.string()
				.optional(),
			name: Joi.string()
				.required(),
			text: Joi.string()
				.required(),
		}).options({ abortEarly: false });
		const validate = await schema.validate(body, config.options);
		return AppError.formatInputError(validate);
	}
	/**
     * @param {Object} body The object to validate
     * @return {Object} Validator
     */
	async update(body = {}) {
		const schema = Joi.object({
			user: Joi.string()
				.optional(),
			name: Joi.string()
				.optional(),
			text: Joi.string()
				.optional(),
		}).options({ abortEarly: false });
		const validate = await schema.validate(body, config.options);
		return AppError.formatInputError(validate);
	}
}

export default TodoValidation;
