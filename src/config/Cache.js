import redis from "redis";
import logger from "./Logger";

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

client.on("error", (error) => {
    logger.error(`${error.name} caused by: ${error.message}`);
});

export default client;  