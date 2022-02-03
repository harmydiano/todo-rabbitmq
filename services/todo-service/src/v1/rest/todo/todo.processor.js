import AppProcessor from '../_core/app.processor';
import AppResponse from '../../../lib/api/app-response';
import _ from 'lodash';

/**
 * The TodoProcessor class
 */
class TodoProcessor extends AppProcessor {

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
			return AppResponse.format(meta, value);
		} catch (e) {
			throw e;
		}
	}
}

export default TodoProcessor;
