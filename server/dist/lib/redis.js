"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const getRedisUrl = () => {
    if (process.env.REDIS_URL) {
        return process.env.REDIS_URL;
    }
    throw new Error("REDIS_URL IS NOT PROVIDED");
};
exports.redis = new ioredis_1.default(getRedisUrl(), {
    maxRetriesPerRequest: null, // disables the 20 retry limit
    retryStrategy(times) {
        if (times > 5)
            return null; // give up after 5 attempts
        return Math.min(times * 100, 2000); // backoff delay
    },
});
