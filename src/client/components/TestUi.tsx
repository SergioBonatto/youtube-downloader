import React from 'react';
import { VideoForm } from '../components/VideoForm';

export const DownloadPage = () => {
  const handleDownloadSuccess = (videoId: string) => {
    // Manipular sucesso do download, ex: iniciar polling de status
    console.log('Download started for video:', videoId);
  };

  return (
    <VideoForm onSuccess={handleDownloadSuccess} />
  );
};
