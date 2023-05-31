import { RedisOptions } from "ioredis";

const redisClientConfig: RedisOptions = {
  enableOfflineQueue: false,
  host: process.env.REDIS_HOST,
  port: 6379,
};

export { redisClientConfig };
