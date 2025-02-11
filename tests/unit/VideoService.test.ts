import { VideoService } from '../../src/server/application/services/VideoService';
import { mockYoutubeApi } from '../mocks/youtubeApi';
import '@types/jest';

describe('VideoService', () => {
  let videoService: VideoService;

  beforeEach(() => {
    const mockDownloadQueue = {}; 
    videoService = new VideoService(mockYoutubeApi, mockDownloadQueue);
  });

  it('should create download job', async () => {
    const input = {
      url: 'https://youtube.com/watch?v=123',
      format: 'mp4',
      quality: '720p'
    };

    const result = await videoService.createDownload(input);

    expect(result).toHaveProperty('id');
    expect(result.status).toBe('pending');
  });

  it('should throw error for invalid URL', async () => {
    const input = {
      url: 'invalid-url',
      format: 'mp4'
    };

    await expect(videoService.createDownload(input))
      .rejects.toThrow('URL inválida');
  });

  // Adicionar mais testes
  it('should handle download with different formats', async () => {
    const input = {
      url: 'https://youtube.com/watch?v=123',
      format: 'mp3'
    };

    const result = await videoService.createDownload(input);
    expect(result.format).toBe('mp3');
  });
});
