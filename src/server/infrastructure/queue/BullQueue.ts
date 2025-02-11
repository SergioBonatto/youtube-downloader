import Bull from 'bull';
import { Video } from '../../domain/entities/Video';
import { IVideoRepository } from '../../domain/repositories/IVideoRepository';
import { DownloadService } from '../../../services/downloadService';
import { logger } from '../../../utils/logger';

export class DownloadQueue {
  private queue: Bull.Queue;

  constructor(
    private redisUrl: string,
    private videoRepository: IVideoRepository,
    private downloadService: DownloadService
  ) {
    this.queue = new Bull('video-downloads', redisUrl, {
      redis: {
        maxRetriesPerRequest: 3,
      },
      limiter: {
        max: 3, // Máximo de downloads simultâneos
        duration: 1000 // Intervalo em ms
      }
    });

    this.setupProcessors();
    this.setupListeners();
  }

  private setupProcessors() {
    this.queue.process(async (job) => {
      const video = job.data as Video;

      try {
        // Atualiza status para downloading
        await this.videoRepository.updateStatus(video.id, 'downloading');

        // Inicia o download
        const result = await this.downloadService.downloadVideo(video.url, video.format);

        // Atualiza progresso durante o download
        job.progress(50);
        await this.videoRepository.updateProgress(video.id, 50);

        // Processa o vídeo (conversão, etc)
        await this.processVideo(result, video.format);

        // Finaliza com sucesso
        await this.videoRepository.updateStatus(video.id, 'completed');
        await this.videoRepository.updateProgress(video.id, 100);

        return result;

      } catch (error) {
        // Em caso de erro
        logger.error(`Queue processing error for video ${video.id}: ${error}`);
        await this.videoRepository.updateStatus(video.id, 'failed');
        throw error;
      }
    });
  }

  private setupListeners() {
    this.queue.on('completed', async (job) => {
      const video = job.data as Video;
      logger.info(`Download completed for video ${video.id}`);
    });

    this.queue.on('failed', async (job, error) => {
      const video = job.data as Video;
      logger.error(`Download failed for video ${video.id}: ${error}`);
    });

    this.queue.on('progress', async (job, progress) => {
      const video = job.data as Video;
      await this.videoRepository.updateProgress(video.id, progress);
    });
  }

  private async processVideo(filePath: string, format: string): Promise<void> {
    // Aqui você pode adicionar lógica de processamento adicional
    // Como conversão de formato, compressão, etc
  }

  async add(video: Video) {
    await this.videoRepository.save(video);
    return this.queue.add(video, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000
      },
      removeOnComplete: true,
      removeOnFail: false
    });
  }

  async getStatus(videoId: string): Promise<Video | null> {
    return this.videoRepository.findById(videoId);
  }

  async cancelDownload(videoId: string): Promise<void> {
    const jobId = await this.queue.getJob(videoId);
    if (jobId) {
      await jobId.remove();
      await this.videoRepository.updateStatus(videoId, 'failed');
    }
  }

  async getPendingCount(): Promise<number> {
    return this.queue.getWaitingCount();
  }

  async clearQueue(): Promise<void> {
    await this.queue.empty();
  }
}
