"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadService = void 0;
const youtube_dl_exec_1 = __importDefault(require("youtube-dl-exec"));
const logger_1 = require("../utils/logger");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ffmpeg_static_1 = __importDefault(require("ffmpeg-static"));
class DownloadService {
    async downloadVideo(url, format) {
        try {
            logger_1.logger.info(`Starting download - URL: ${url}, Format: ${format}`);
            if (!fs_1.default.existsSync('downloads')) {
                fs_1.default.mkdirSync('downloads');
            }
            if (!ffmpeg_static_1.default) {
                throw new Error('FFmpeg not found');
            }
            const outputTemplate = path_1.default.join('downloads', '%(title)s.%(ext)s');
            // Base configurations
            const baseOptions = {
                output: outputTemplate,
                addMetadata: true,
                noCheckCertificates: true,
                preferFreeFormats: true,
                noWarnings: true,
                writeThumbnail: false,
                ffmpegLocation: ffmpeg_static_1.default
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
                const result = await (0, youtube_dl_exec_1.default)(url, options);
                const files = fs_1.default.readdirSync('downloads');
                const downloadedFile = files.find(file => file.endsWith(format === 'audio' ? '.mp3' : '.mp4'));
                if (!downloadedFile) {
                    throw new Error('File not found after download');
                }
                const outputPath = path_1.default.join('downloads', downloadedFile);
                logger_1.logger.info(`Download completed: ${outputPath}`);
                return outputPath;
            }
            catch (downloadError) {
                const errorMessage = downloadError instanceof Error
                    ? downloadError.message
                    : 'Unknown download error';
                logger_1.logger.error(`Download error: ${errorMessage}`);
                throw new Error(`Download failed: ${errorMessage}`);
            }
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            logger_1.logger.error(`Error in download service: ${errorMessage}`);
            throw error;
        }
    }
}
exports.DownloadService = DownloadService;
