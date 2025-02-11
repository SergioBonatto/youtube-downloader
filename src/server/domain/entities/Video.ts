export interface Video {
    id: string;
    url: string;
    title: string;
    format: string;
    quality: string;
    status: 'pending' | 'downloading' | 'completed' | 'failed';
    progress: number;
  }
