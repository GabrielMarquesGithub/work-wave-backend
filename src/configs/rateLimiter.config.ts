import { IRateLimiterRedisOptions } from "rate-limiter-flexible";

const rateLimiterRedisConfig: Omit<IRateLimiterRedisOptions, "storeClient"> = {
  rejectIfRedisNotReady: true,
  keyPrefix: "middleware",
  points: 10, // 10 requests
  duration: 1, // per 1 second by IP
};

export { rateLimiterRedisConfig };
