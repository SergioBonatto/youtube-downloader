"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadController = void 0;
const downloadService_1 = require("../services/downloadService");
const logger_1 = require("../utils/logger");
class DownloadController {
    constructor() {
        this.download = async (req, res) => {
            try {
                const { url, format } = req.body;
                if (!url) {
                    res.status(400).json({ error: 'URL is required' });
                    return;
                }
                const result = await this.downloadService.downloadVideo(url, format);
                res.status(200).json({ message: 'Download completed', data: result });
            }
            catch (error) {
                logger_1.logger.error(`Controller error: ${error}`);
                res.status(500).json({ error: 'Internal server error' });
            }
        };
        this.downloadService = new downloadService_1.DownloadService();
    }
}
exports.DownloadController = DownloadController;
