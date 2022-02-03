import amq from "amqplib/callback_api";
import mongoose from "mongoose";
require('dotenv').config();
import config from "config";
const Queue = config.get("queue.name");
import UserProcessor from "./v1/rest/user/user.processor";
import UserEventEmitter from "./v1/rest/user/user.emitter";

(async () => {
  let channel;
  let mongo;

  const init = async () => {
    if (!mongo) {
      mongo = await mongoose.connect(process.env.DB_URL || "mongodb://0.0.0.0:27017/app", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    }
    return new Promise((resolve, reject) => {
      amq.connect(process.env.MQ_URI || "amqp://localhost", (e1, conn) => {
        if (e1) return reject(e1);

        conn.createChannel((e2, channel) => {
          if (e2) return reject(e2);

          return resolve(channel);
        });
      });
    })
  }

  const run = (channel) => {
    console.log("Listener running");
    console.log("--------------------------");
    channel.assertQueue(Queue, {
      durable: false
    });

    channel.consume(Queue, function (msg) {
        console.log(" [x] Received %s", msg.content.toString());
        UserProcessor.saveUser(JSON.parse(msg.content.toString()));
        //UserEventEmitter.emit("createUser", JSON.parse(msg.content.toString()));
        
    }, {
      noAck: true
    });
  }

  const interval = setInterval(async () => {
    console.log("Starting listener");
    console.log("--------------------------");

    if (!channel) {
      try {
        channel = await init();
      } catch (e) {
        console.log(e.message);
      }
    } else {
      clearInterval(interval);
      await run(channel);
    }
  }, 5000);

})();
