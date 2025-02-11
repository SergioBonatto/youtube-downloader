import youtubeDl from 'youtube-dl-exec';
import { logger } from '../utils/logger';
import fs from 'fs';
import path from 'path';
import ffmpeg from 'ffmpeg-static';

export class DownloadService {
  public async downloadVideo(url: string, format: string): Promise<string> {
    try {
      logger.info(`Starting download - URL: ${url}, Format: ${format}`);

      if (!fs.existsSync('downloads')) {
        fs.mkdirSync('downloads');
      }

      if (!ffmpeg) {
        throw new Error('FFmpeg not found');
      }

      const outputTemplate = path.join('downloads', '%(title)s.%(ext)s');

      // Base configurations
      const baseOptions = {
        output: outputTemplate,
        addMetadata: true,
        noCheckCertificates: true,
        preferFreeFormats: true,
        noWarnings: true,
        writeThumbnail: false,
        ffmpegLocation: ffmpeg as string
      };

      // Format specific configurations
      const options = format === 'audio'
        ? {
            ...baseOptions,
            format: 'bestaudio',
            extractAudio: true,
            audioFormat: 'mp3'
          }
        : {
            ...baseOptions,
            format: 'best[ext=mp4]'
          };

      try {
        const result = await youtubeDl(url, options);

        const files = fs.readdirSync('downloads');
        const downloadedFile = files.find(file =>
          file.endsWith(format === 'audio' ? '.mp3' : '.mp4')
        );

        if (!downloadedFile) {
          throw new Error('File not found after download');
        }

        const outputPath = path.join('downloads', downloadedFile);
        logger.info(`Download completed: ${outputPath}`);
        return outputPath;

      } catch (downloadError) {
        const errorMessage = downloadError instanceof Error
          ? downloadError.message
          : 'Unknown download error';
        logger.error(`Download error: ${errorMessage}`);
        throw new Error(`Download failed: ${errorMessage}`);
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error(`Error in download service: ${errorMessage}`);
      throw error;
    }
  }
}
