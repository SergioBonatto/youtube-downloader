import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  VStack,
  Text,
  useToast,
  RadioGroup,
  Radio,
  HStack,
} from '@chakra-ui/react';
import axios from 'axios';

export const VideoDownloader: React.FC = () => {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('video');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/download', {
        url,
        format
      });

      toast({
        title: 'Success!',
        description: 'Download started successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to start download',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={6}>
        <Text fontSize="2xl" fontWeight="bold">
          YouTube Downloader
        </Text>

        <Box as="form" w="100%" onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl>
              <Input
                placeholder="Paste YouTube URL here"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                size="lg"
              />
            </FormControl>

            <FormControl>
              <RadioGroup value={format} onChange={setFormat}>
                <HStack spacing={4}>
                  <Radio value="video">Video (MP4)</Radio>
                  <Radio value="audio">Audio (MP3)</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>

            <Button
              colorScheme="red"
              isLoading={isLoading}
              loadingText="Downloading..."
              w="100%"
              type="submit"
              disabled={!url}
            >
              Download {format === 'video' ? 'Video' : 'Audio'}
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};
