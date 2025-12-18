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

      // Base configurations com estratégia robusta para yt-dlp
      const baseOptions = {
        output: outputTemplate,
        noCheckCertificates: true,
        preferFreeFormats: true,
        noPlaylist: true,
        ffmpegLocation: ffmpeg as string,
        extractorArgs: 'youtube:player_client=web' // Força o cliente web
      };

      let selectedOptions: any;

      if (format === 'audio') {
        // Para áudio, usar estratégia simples e robusta
        selectedOptions = {
          ...baseOptions,
          format: 'bestaudio',
          extractAudio: true,
          audioFormat: 'mp3',
          audioQuality: '192'
        };
      } else {
        // Para vídeo, usar formato mais simples que funciona com yt-dlp moderno
        selectedOptions = {
          ...baseOptions,
          format: 'best[height<=1080]' // Limita a altura para evitar problemas
        };
      }

      try {
        const result = await youtubeDl(url, selectedOptions);
        logger.info(`Download completed successfully`);

        return await this.findDownloadedFile(format);

      } catch (downloadError) {
        const errorMessage = downloadError instanceof Error
          ? downloadError.message
          : 'Unknown download error';

        logger.warn(`Primary format strategy failed: ${errorMessage}. Attempting fallback...`);

        // Fallback strategy 1: usar formato ainda mais simples
        try {
          const fallbackOptions: any = {
            ...baseOptions,
            format: 'best' // Deixa yt-dlp decidir automaticamente
          };

          const fallbackResult = await youtubeDl(url, fallbackOptions);
          logger.info(`Fallback strategy 1 succeeded`);

          return await this.findDownloadedFile(format);
        } catch (fallbackError1) {
          logger.warn(`Fallback strategy 1 failed. Attempting strategy 2...`);

          // Fallback strategy 2: usar apenas vídeo/áudio simples
          try {
            const finalFallback: any = format === 'audio'
              ? { ...baseOptions, format: 'best', extractAudio: true, audioFormat: 'mp3' }
              : { ...baseOptions, format: 'bestvideo,bestaudio/best' };

            await youtubeDl(url, finalFallback);
            logger.info(`Final fallback strategy succeeded`);

            return await this.findDownloadedFile(format);
          } catch (finalError) {
            const finalErrorMessage = finalError instanceof Error
              ? finalError.message
              : 'Unknown error';

            logger.error(`All download strategies failed. Last error: ${finalErrorMessage}`);

            // Erro mais informativo para o usuário
            throw new Error(
              `Download failed after 3 attempts. URL may be unavailable, private, or yt-dlp needs update. Error: ${finalErrorMessage}`
            );
          }
        }
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error(`Error in download service: ${errorMessage}`);
      throw error;
    }
  }

  private async findDownloadedFile(format: string): Promise<string> {
    const downloadDir = path.join(process.cwd(), 'downloads');
    const files = fs.readdirSync(downloadDir);

    if (files.length === 0) {
      throw new Error(`No files found in download directory`);
    }

    let downloadedFile: string | undefined;

    if (format === 'audio') {
      downloadedFile = files.find(file => file.endsWith('.mp3'));
      if (!downloadedFile) {
        downloadedFile = files.find(file => file.endsWith('.m4a'));
      }
    } else {
      // Para vídeo, procura pelos formatos mais comuns
      downloadedFile = files.find(file =>
        file.endsWith('.mp4') ||
        file.endsWith('.webm') ||
        file.endsWith('.mkv') ||
        (!file.endsWith('.mp3') && !file.endsWith('.m4a') && !file.startsWith('.'))
      );
    }

    if (!downloadedFile) {
      const availableFormats = files.map(f => f.split('.').pop()).join(', ');
      throw new Error(
        `Expected ${format === 'audio' ? '.mp3' : 'video'} file not found. Available: ${availableFormats}`
      );
    }

    const outputPath = path.join(downloadDir, downloadedFile);
    logger.info(`Download completed: ${outputPath}`);
    return outputPath;
  }
}
