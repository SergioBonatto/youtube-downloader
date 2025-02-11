import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { VideoDownloader } from './components/VideoDownloader';

export const App: React.FC = () => {
  return (
    <ChakraProvider>
      <VideoDownloader />
    </ChakraProvider>
  );
};
