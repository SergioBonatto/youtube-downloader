import youtubedl from 'youtube-dl-exec';

const downloadVideo = (url: string) => {
  youtubedl(url, {
    format: 'mp4',
    output: '%(title)s.%(ext)s',
  })
    .then((output) => {
      console.log('Download concluído!', output);
    })
    .catch((error) => {
      console.error('Erro ao baixar o vídeo:', error);
    });
};

const videoUrl = process.argv[2];
if (videoUrl) {
  downloadVideo(videoUrl);
} else {
  console.log('Por favor, forneça a URL do vídeo.');
}

