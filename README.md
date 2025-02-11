# YouTube Downloader

A modern web application for downloading YouTube videos with a clean architecture and TypeScript support.

## Features

- Download YouTube videos in multiple formats and qualities
- Queue system for multiple downloads
- Progress tracking
- Error handling and logging
- Rate limiting
- Caching support
- Format conversion options

## Technology Stack

### Frontend
- React with TypeScript
- Chakra UI for components
- Axios for API requests
- React Query for data fetching
- React Router for navigation

### Backend
- Node.js with Express
- TypeScript
- Clean Architecture principles
- Dependency Injection
- Queue processing with Bull
- Redis for caching
- Winston for logging
- Jest for testing

## Project Structure

```
├── src/
│   ├── client/              # Frontend code
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── server/             # Backend code
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── services/       # Business logic
│   │   ├── models/         # Data models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utilities
│   │   └── middleware/     # Custom middleware
│   │
│   └── shared/            # Shared types and utilities
│
├── tests/                 # Test files
├── docs/                 # Documentation
└── scripts/              # Build and deployment scripts
```

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/youtube-downloader.git
cd youtube-downloader
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file:
```env
NODE_ENV=development
PORT=3000
REDIS_URL=redis://localhost:6379
MAX_CONCURRENT_DOWNLOADS=3
DOWNLOAD_PATH=./downloads
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

4. Start development servers:
```bash
# Start backend
npm run dev:server

# Start frontend
npm run dev:client
```

## API Endpoints

### Videos
- `GET /api/videos/info?url={videoUrl}` - Get video information
- `POST /api/videos/download` - Start download
- `GET /api/videos/status/{id}` - Check download status
- `DELETE /api/videos/cancel/{id}` - Cancel download

### Queue
- `GET /api/queue/status` - Get queue status
- `POST /api/queue/clear` - Clear queue

## Best Practices

- Type safety with TypeScript
- Error handling and logging
- Input validation
- Rate limiting
- Request caching
- Progress tracking
- Queue management
- Unit and integration tests
- API documentation

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## Testing

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e
```

## License

MIT License
