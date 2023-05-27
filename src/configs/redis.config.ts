import { RedisOptions } from "ioredis";

const redisClientConfig: RedisOptions = {
  enableOfflineQueue: false,
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
};

export { redisClientConfig };
