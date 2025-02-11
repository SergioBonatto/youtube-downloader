export class VideoService {
  private youtubeApi: any;
  private downloadQueue: any;

  constructor(youtubeApi: any, downloadQueue: any) {
    this.youtubeApi = youtubeApi;
    this.downloadQueue = downloadQueue;
  }

  async createDownload(input: { url: string; format: string; quality?: string }) {
    if (!this.isValidUrl(input.url)) {
      throw new Error('URL inválida');
    }

    const job = {
      id: this.generateId(),
      url: input.url,
      format: input.format,
      quality: input.quality || '720p',
      status: 'pending'
    };

    this.downloadQueue[job.id] = job;
    return job;
  }

  private isValidUrl(url: string): boolean {
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!urlPattern.test(url);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
