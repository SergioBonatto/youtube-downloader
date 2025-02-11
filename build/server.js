"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const downloadRoutes_1 = __importDefault(require("./routes/downloadRoutes"));
const config_1 = require("./config/config");
const logger_1 = require("./utils/logger");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: config_1.config.rateLimitWindow,
    max: config_1.config.rateLimitMax
});
app.use(limiter);
// Rotas
app.use('/api', downloadRoutes_1.default);
// Error handling
app.use((err, req, res, next) => {
    logger_1.logger.error(err.stack);
    res.status(500).json({ error: 'Algo deu errado!' });
});
app.listen(config_1.config.port, () => {
    logger_1.logger.info(`Servidor rodando na porta ${config_1.config.port}`);
});
app.use(express_1.default.static(path_1.default.join(__dirname, '../../build')));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../build/index.html'));
});
