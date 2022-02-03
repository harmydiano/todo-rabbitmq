const EventDispatch = require("./dispatch.model");
const { EventModel } = require("../events/event.model");

class EventDispatchService {
  findLastDispatchEvent() {
    return EventDispatch.findOne({}).sort({ createdAt: "desc" });
  }

  storeLatestDispatch(lastEvent) {
    if (lastEvent) {
      new EventDispatch({ createdAt: lastEvent.createdAt }).save();
    }
  }

  findUnsentEvents(dispatch) {
    if (dispatch) {
      return EventModel.find({ createdAt: { $gt: dispatch.createdAt } });
    } else {
      return EventModel.find({});
    }
  }
}

module.exports = EventDispatchService;
