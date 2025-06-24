# ASL (American Sign Language) Recognition Project

A production-ready solution for real-time American Sign Language recognition using computer vision and deep learning.

## Features

- Real-time ASL recognition using computer vision
- Multiple recognition approaches:
  - CNN-based classification
  - Keypoint-based detection
  - YOLO object detection
- Cross-platform mobile application
- Production-ready RESTful API server
- Containerized deployment support
- Comprehensive CI/CD pipeline

## Project Structure

```
├── Scripts/                 # Core ML/AI implementation
│   ├── Keypoints/          # Keypoint-based recognition
│   ├── YOLO/               # YOLO-based object detection
│   └── train/              # Training scripts and utilities
├── UI_expo/                # Mobile application (Expo/React Native)
├── docs/                   # Project documentation
├── models/                 # Trained model weights
├── server/                 # Backend server implementation
├── deploy/                 # Deployment configurations
└── requirements.txt        # Python dependencies
```

## Quick Start

### Development Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/asl-recognition.git
cd asl-recognition
```

2. Set up environment:
```bash
cp .env.example .env  # Configure your environment variables
make install-dev      # Install Python dependencies
make install-ui       # Install UI dependencies
```

3. Start development servers:
```bash
make run-server  # Start backend server
make run-ui      # Start mobile app development server
```

### Production Deployment

1. Using Docker Compose:
```bash
docker-compose up -d
```

2. Manual Deployment:
```bash
# Build the application
make clean
pip install -r requirements.txt
pip install -e .

# Start the server
gunicorn -w 4 -b 0.0.0.0:5000 server.App:app
```

## Configuration

- Environment variables: Copy `.env.example` to `.env` and configure
- Nginx: Configure `deploy/nginx.conf` for your domain
- Docker: Adjust `Dockerfile` and `docker-compose.yml` as needed

## Testing

```bash
make test       # Run all tests
make lint       # Run code quality checks
make test-live  # Run live recognition tests
```

## Security

- See `SECURITY.md` for vulnerability reporting
- All API endpoints are HTTPS-only in production
- Input validation and sanitization implemented
- Rate limiting enabled

## Performance Optimization

- Docker containers optimized for production
- Nginx configured for static file serving
- Model inference optimized for CPU/GPU
- Caching implemented where appropriate

## Monitoring & Logging

- Health check endpoints available
- Structured logging implemented
- Docker health checks configured
- Performance metrics tracking

## Contributing

See `CONTRIBUTING.md` for guidelines.

## License

MIT License - see LICENSE file for details.

## Support

- Create an issue for bug reports
- Use discussions for general questions
- See documentation in `docs/` for guides