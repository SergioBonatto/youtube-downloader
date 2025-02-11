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
  logger.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

app.listen(config.port, () => {
  logger.info(`Servidor rodando na porta ${config.port}`);
});

app.use(express.static(path.join(__dirname, '../../build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build/index.html'));
  });
