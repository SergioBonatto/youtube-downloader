import { VideoService } from '../../application/services/VideoService';
import { Request, Response } from 'express';

export class VideoController {
    constructor(private videoService: VideoService) {}

    async download(req: Request, res: Response): Promise<void> {
      try {
        const { url, format, quality } = req.body as { url: string; format: string; quality?: string };
        const video = await this.videoService.createDownload({ url, format, quality });
        res.json(video);
      } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
      }
    }
  }
