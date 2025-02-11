import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  rateLimitWindow: 15 * 60 * 1000,
  rateLimitMax: 100
};
