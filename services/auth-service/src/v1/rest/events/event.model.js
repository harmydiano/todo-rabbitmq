import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  eventData: Object,
  createdAt: { type: Date, default: Date.now }
});

module.exports.EventModel = mongoose.model("Event", EventSchema);

const evenTypes = {
    createUser: "CreateUser"
};

module.exports.evenTypes = evenTypes;

