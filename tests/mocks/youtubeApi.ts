export const mockYoutubeApi = {
    createDownload: jest.fn().mockImplementation((input) => {
      if (!input.url.includes('youtube.com')) {
        throw new Error('URL inválida');
      }

      return Promise.resolve({
        id: 'mock-id-123',
        status: 'pending',
        format: input.format,
        url: input.url
      });
    })
  };
