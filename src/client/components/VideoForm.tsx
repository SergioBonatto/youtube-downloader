import { useState } from 'react';
import {
  Button,
  Input,
  Select,
  VStack,
  FormControl,
  FormLabel,
  useToast,
  Box,
  Text,
  Progress
} from '@chakra-ui/react';
import { videoService } from '../services/videoService';

interface VideoFormProps {
  onSuccess?: (videoId: string) => void;
}

export const VideoForm = ({ onSuccess }: VideoFormProps) => {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('mp4');
  const [quality, setQuality] = useState('720p');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url) {
      toast({
        title: 'Error',
        description: 'Please enter a valid YouTube URL',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    setProgress(0);

    try {
      const response = await videoService.startDownload(url, format, quality);

      toast({
        title: 'Success',
        description: 'Download started successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      if (onSuccess && response.data.id) {
        onSuccess(response.data.id);
      }

      // Reset form
      setUrl('');
      setProgress(100);

    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to start download',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="100%" maxW="600px">
      <VStack as="form" onSubmit={handleSubmit} spacing={6} align="stretch">
        <FormControl isRequired>
          <FormLabel>YouTube URL</FormLabel>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            size="lg"
            disabled={isLoading}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Format</FormLabel>
          <Select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            disabled={isLoading}
          >
            <option value="mp4">Video (MP4)</option>
            <option value="mp3">Audio (MP3)</option>
            <option value="webm">Video (WebM)</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Quality</FormLabel>
          <Select
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            disabled={isLoading || format === 'mp3'}
          >
            <option value="1080p">1080p</option>
            <option value="720p">720p</option>
            <option value="480p">480p</option>
            <option value="360p">360p</option>
          </Select>
        </FormControl>

        {progress > 0 && (
          <Box>
            <Text mb={2}>Download Progress</Text>
            <Progress value={progress} size="sm" colorScheme="red" />
          </Box>
        )}

        <Button
          type="submit"
          colorScheme="red"
          size="lg"
          isLoading={isLoading}
          loadingText="Starting Download..."
          disabled={!url || isLoading}
        >
          Download
        </Button>
      </VStack>
    </Box>
  );
};
