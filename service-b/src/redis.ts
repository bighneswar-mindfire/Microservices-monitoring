import Redis from 'ioredis';

const REDIS_HOST = process.env.REDIS_HOST || 'redis';
const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;

export const redis = new Redis({ host: REDIS_HOST, port: REDIS_PORT });
