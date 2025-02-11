import { Redis } from 'ioredis';
import { Video } from '../../domain/entities/Video';
import { IVideoRepository } from '../../domain/repositories/IVideoRepository';

export class RedisVideoRepository implements IVideoRepository {
  constructor(private redis: Redis) {}

  async save(video: Video): Promise<void> {
    await this.redis.hset(
      `video:${video.id}`,
      {
        ...video,
        status: video.status,
        progress: video.progress.toString()
      }
    );
  }

  async findById(id: string): Promise<Video | null> {
    const video = await this.redis.hgetall(`video:${id}`);

    if (Object.keys(video).length === 0) {
      return null;
    }

    return {
      ...video,
      progress: parseFloat(video.progress),
      status: video.status as Video['status']
    } as Video;
  }

  async updateStatus(id: string, status: Video['status']): Promise<void> {
    await this.redis.hset(`video:${id}`, 'status', status);
  }

  async updateProgress(id: string, progress: number): Promise<void> {
    await this.redis.hset(`video:${id}`, 'progress', progress.toString());
  }

  async delete(id: string): Promise<void> {
    await this.redis.del(`video:${id}`);
  }

  async list(): Promise<Video[]> {
    const keys = await this.redis.keys('video:*');
    const videos: Video[] = [];

    for (const key of keys) {
      const video = await this.findById(key.replace('video:', ''));
      if (video) {
        videos.push(video);
      }
    }

    return videos;
  }

  async findByStatus(status: Video['status']): Promise<Video[]> {
    const allVideos = await this.list();
    return allVideos.filter(video => video.status === status);
  }
}
