import _ from 'lodash';
const {evenTypes, EventModel}  = require("./event.model");
class EventProcessor {
    /**
     * @param {String} id The object properties
     * @param {Object} obj The object properties
     * @return {Promise<Object>}
     */
	static processNewObject(id, obj) {
		return {
            type: evenTypes.createUser,
            id,
            data: obj,
          }
    }
    
    /**
     * @param {Object} obj The main property
      * @return {Promise<Object>}
     */
	static async save(obj) {
            const data = _.extend(_.omit(obj.data, ['session']));
            const object = _.extend({}, {
                  type: obj.type,
                  id: obj.id,
                  data
            })
            return await new EventModel({ eventData: object }).save();
	}
}

module.exports = EventProcessor;
