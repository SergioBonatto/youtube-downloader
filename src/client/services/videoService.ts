import { api } from './api';

export const videoService = {
  async getInfo(url: string) {
    return api.get(`/videos/info?url=${url}`);
  },

  async startDownload(url: string, format: string, quality: string) {
    return api.post('/videos/download', { url, format, quality });
  },

  async checkStatus(id: string) {
    return api.get(`/videos/status/${id}`);
  }
};
