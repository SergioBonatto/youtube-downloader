export class VideoController {
    constructor(private videoService: VideoService) {}

    async download(req: Request, res: Response) {
      try {
        const { url, format, quality } = req.body;
        const video = await this.videoService.startDownload(url, format, quality);
        res.json(video);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
