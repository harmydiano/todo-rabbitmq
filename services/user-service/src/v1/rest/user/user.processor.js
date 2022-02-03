import lang from '../../lang';
import {User} from './user.model';
import _ from 'lodash';
import AppProcessor from '../_core/app.processor';
import { addHourToDate, generateOTCode, sendEmail, sendMail } from '../../../utils/helpers';
import { PENDING, ONGOING, NOT_FOUND, BAD_REQUEST, UNAUTHORIZED } from '../../../utils/constants';
import AppResponse from '../../../lib/api/app-response';
import AppError from '../../../lib/api/app-error';

/**
 * The ModuleProcessor class
 */
class UserProcessor extends AppProcessor {
    /**
     * @param {Object} obj The object properties
     * @return {Promise<Object>}
     */
    async processNewObject(obj) {
        obj.verifyCodeExpiration = addHourToDate(1);
        const code = 1234;
        // const code = generateOTCode(4);
        obj = await _.extend(obj, { verificationCode: code });
        return obj;
    }

    /**
     * @param {Object} options required for response
     * @return {Promise<Object>}
     */
    static async getResponse({ model, value, code, message, count, token, email }) {
        try {
            const meta = AppResponse.getSuccessMeta();
            if (token) {
                meta.token = token;
            }
            _.extend(meta, { status_code: code });
            if (message) {
                meta.message = message;
            }
            if (model.hiddenFields && model.hiddenFields.length > 0) {
                value = _.omit(value.toJSON(), ...model.hiddenFields);
            }

            return AppResponse.format(meta, value);
        } catch (e) {
            throw e;
        }
    }

    /**
     * @param {Object} auth The main property
     * @param {Object} object The object properties
     * @return {Object} returns the api error if main cannot be verified
     */
    static async canVerify(auth, object) {
        if (!auth) {
            return new AppError(lang.get('auth').account_does_not_exist, NOT_FOUND);
        }
        return true;
    }

    /**
     * @param {Object} obj The payload object
     * @param {Object} session The payload object
     * @return {Object}
     */
    static async saveUser(obj) {
        try{
            console.log("Saving user to db");
            const { user } = obj.data;
            const objectToUpdate = _.omit(obj.data, ['email', 'password', 'verifyCodeExpiration', 'verificationCode']);
            const newUser = new User(objectToUpdate);
            return await newUser.save();
        }
        catch(err){
            console.log(err);
        }
        
    }

    /**
	 * @param {Object} id The object properties
	 * @return {Promise<Object>}
	 */
	static async userExist(id) {
		return await User.findOne({ _id: id });
    }
    
}

export default UserProcessor;
