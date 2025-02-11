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
Coletando informações do workspace# YouTube Downloader Core

A TypeScript backend service for downloading and processing YouTube videos with queue management and progress tracking.

## Core Features

- Multi-format video/audio downloads (MP4, MP3, WebM)
- Queue system with Redis/Bull
- Progress tracking and status management
- Error handling with Winston logger
- Rate limiting and request validation
- Clean Architecture principles

## Tech Stack

- Node.js + TypeScript
- Express.js for API
- Bull for queue management
- Redis for queue storage
- Winston for logging
- Jest for testing

## Getting Started

### Prerequisites

- Node.js 16+
- Redis server running
- TypeScript knowledge
- Basic understanding of queues

### Installation

```bash
npm install
```

### Configuration

Create .env file:
```env
NODE_ENV=development
PORT=3000
REDIS_URL=redis://localhost:6379
MAX_CONCURRENT_DOWNLOADS=3
DOWNLOAD_PATH=./downloads
```

### Running

Development:
```bash
npm run dev
```

Build and run production:
```bash
npm run build
npm start
```

Frontend demo:
```bash
npm run client
```

## Core Components

### `DownloadQueue`
Handles download queue management using Bull:
- Concurrent download limiting
- Progress tracking
- Auto-retry on failures
- Status management

### `VideoService`
Main business logic:
- URL validation
- Format processing
- Queue job creation
- Status tracking

## API Endpoints

### Download Management
```typescript
POST /api/videos/download
{
  url: string,
  format: "mp4" | "mp3" | "webm",
  quality?: "1080p" | "720p" | "480p" | "360p"
}

GET /api/videos/status/:id
GET /api/queue/status
POST /api/queue/clear
```

## Development

### Project Structure
```
src/
├── server/
│   ├── application/    # Use cases & business logic
│   ├── domain/        # Entities & interfaces
│   ├── infrastructure/# External services implementation
│   └── presentation/  # API controllers & routes
├── services/          # Core services
└── utils/            # Shared utilities
```

### Testing

```bash
npm run test          # Unit tests
npm run test:int     # Integration tests
```

### Error Handling
Errors are logged using `logger` and include:
- Queue processing errors
- Download failures
- Invalid URL/format errors

## Contributing

1. Fork repository
2. Create feature branch
3. Follow TypeScript best practices
4. Add tests
5. Submit PR

## License

MIT

Note: Frontend React demo included for testing purposes only.
# Run e2e tests
npm run test:e2e
```

## License

MIT License
