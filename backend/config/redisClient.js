const redis = require("redis"); // npm install redis
const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
  retry_strategy: (options) => {
    console.log("Retry strategy called", options);
    return 1000;
  },
});

client.on("connect", () => {
  console.log("Connected to Redis");
});

client.on("ready", () => {
  console.log("Redis client is ready to use");
});

client.on("reconnecting", () => {
  console.log("Redis client is reconnecting");
});

client.on("end", () => {
  console.log("Redis client connection has ended");
});

client.on("error", (err) => {
  console.log("Redis error: " + err);
});

module.exports = client;
