import mongoose from "mongoose";
import amq from "amqplib";

require('dotenv').config();
const EventDispatchService = require("../src/v1/rest/dispatch/dispatch.processor");
const { userQueue } = require("../src/v1/rest/events/");
const dispatchEventObject = require("../src/v1/rest/events/event.config");
const eventDispatchService = new EventDispatchService();

(async () => {
  let conn;
  let channel;
  let mongo;

  const run = async () => {
    if (!conn) {
      conn = await amq.connect(process.env.MQ_URI || "amqp://localhost")
      channel = await conn.createChannel();
    }

    if (!mongo) {
      mongo = await mongoose.connect(process.env.DB_URL || "mongodb://0.0.0.0:27017/app", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    }

    const dispatch = await eventDispatchService.findLastDispatchEvent();
    const events = await eventDispatchService.findUnsentEvents(dispatch);

    console.log("New events found: ", events.length);
    console.log("--------------------------");

    for (const event of events) {
      channel.assertQueue(userQueue, {
        durable: false
      });

      const msg = JSON.stringify(dispatchEventObject(Object.assign({}, { createdAt: event.createdAt, ...event.eventData })));
      channel.sendToQueue(userQueue, Buffer.from(msg));
      console.log("Sent message: ", msg);
      console.log("--------------------------");
    }

    const lastEvent = events[events.length - 1];
    await eventDispatchService.storeLatestDispatch(lastEvent);
  };

  setInterval(async () => {
    console.log("Running dispatcher");
    console.log("--------------------------");
    try {
      await run();
    } catch (e) {
      console.log(e.message)
    }
  }, 5000)

})();
