import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import downloadRoutes from './routes/downloadRoutes';
import { config } from './config/config';
import { logger } from './utils/logger';
import path from 'path';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  if (req.method === 'POST' && req.body) {
    logger.info(`Body: ${JSON.stringify(req.body)}`);
  }
  next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimitWindow,
  max: config.rateLimitMax
});
app.use(limiter);

// Rotas
app.use('/api', downloadRoutes);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const errorMessage = err instanceof Error ? err.message : 'Unknown error';
  logger.error(`Middleware error: ${errorMessage}`);
  logger.error(err.stack || 'No stack trace available');
  res.status(500).json({ error: errorMessage });
});

app.listen(config.port, () => {
  logger.info(`Servidor rodando na porta ${config.port}`);
  logger.info(`Ambiente: ${config.nodeEnv}`);
});

app.use(express.static(path.join(__dirname, '../../build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build/index.html'));
  });
