import redis from "redis";
import logger from "./Logger";

const client = redis.createClient();

client.on("error", (error) => {
    logger.error(`${error.name} caused by: ${error.message}`);
});

export default client;  