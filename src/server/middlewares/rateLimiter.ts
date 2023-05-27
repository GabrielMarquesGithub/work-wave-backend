import { NextFunction, Request, Response } from "express";
import Redis from "ioredis";
import { RateLimiterRedis } from "rate-limiter-flexible";

import { redisClientConfig } from "../../configs/redis.config";
import { rateLimiterRedisConfig } from "../../configs/rateLimiter.config";

const redisClient = new Redis(redisClientConfig);

const rateLimiterConfig = new RateLimiterRedis({
  storeClient: redisClient,
  ...rateLimiterRedisConfig,
});

// Middleware para limitar
export const rateLimiter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  rateLimiterConfig
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).json({
        message: `Internal server error - Too Many Requests`,
      });
    });
};
