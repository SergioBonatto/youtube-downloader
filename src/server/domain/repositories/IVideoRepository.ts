import { Video } from '../entities/Video';

export interface IVideoRepository {
    save(video: Video): Promise<void>;
    findById(id: string): Promise<Video | null>;
    updateStatus(id: string, status: Video['status']): Promise<void>;
    updateProgress(id: string, progress: number): Promise<void>;
  }
