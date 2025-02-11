import { Request, Response } from 'express';
import { DownloadService } from '../services/downloadService';
import { logger } from '../utils/logger';

export class DownloadController {
  private downloadService: DownloadService;

  constructor() {
    this.downloadService = new DownloadService();
  }

  public download = async (req: Request, res: Response): Promise<void> => {
    try {
      const { url, format } = req.body;

      if (!url) {
        res.status(400).json({ error: 'URL is required' });
        return;
      }

      const result = await this.downloadService.downloadVideo(url, format);
      res.status(200).json({ message: 'Download completed', data: result });
    } catch (error) {
      logger.error(`Controller error: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
