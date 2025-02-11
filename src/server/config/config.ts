export const config = {
    port: process.env.PORT || 3000,
    redisUrl: process.env.REDIS_URL,
    maxConcurrentDownloads: Number(process.env.MAX_CONCURRENT_DOWNLOADS) || 3,
    downloadPath: process.env.DOWNLOAD_PATH || './downloads',
    rateLimitWindow: Number(process.env.RATE_LIMIT_WINDOW) || 15,
    rateLimitMax: Number(process.env.RATE_LIMIT_MAX) || 100
  };
