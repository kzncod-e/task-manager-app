import Redis from "ioredis";

const getRedisUrl = () => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  }
  throw new Error("REDIS_URL IS NOT PROVIDED");
};

export const redis = new Redis(getRedisUrl(), {
  maxRetriesPerRequest: null, // disables the 20 retry limit
  retryStrategy(times) {
    if (times > 5) return null; // give up after 5 attempts
    return Math.min(times * 100, 2000); // backoff delay
  },
});
