# Boilerplate-backend

## Overview

Boiler-Backend

## Table of Contents

- [Overview](#overview)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Docker Setup](#docker-setup)
  - [Local Setup](#local-setup)
- [Docker Commands](#docker-commands)
- [Testing](#testing)
- [API Endpoints](#api-endpoints)
- [Architecture](#architecture)
- [Development Workflow](#development-workflow)
- [Error Handling](#error-handling)
- [Logging](#logging)
- [Development](#development)
- [Deployment](#deployment)

## Technologies

- [Node.js](https://nodejs.org/) - Runtime environment
- [TypeScript](https://www.typescriptlang.org/) - Programming language
- [Express](https://expressjs.com/) - Web framework
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Prisma](https://www.prisma.io/) - ORM
- [PM2](https://pm2.keymetrics.io/) - Process Manager
- [Docker](https://www.docker.com/) - Containerization
- [Jest](https://jestjs.io/) - Testing Framework

## Prerequisites

- Docker >= 20.10
- Docker Compose >= 2.0
- Node.js >= 18
- Yarn package manager

## Getting Started

### Docker Setup

1. Clone and setup:

```bash
cp .env.example .env
```

### Local Setup

```bash
# Install dependencies
yarn install

# Generate Prisma client
yarn prisma:generate

# Start development server
yarn start:dev
```

## Docker Commands

```bash
# Build container
yarn docker:build

# Up container
yarn docker:up

# Rebuild container
yarn docker:rebuild

# View logs
yarn docker:logs

# Stop services and orphans
yarn docker:down

# Stop container and volumes
yarn docker:clean

# Debug mode
yarn docker:debug
```

## Testing

```bash
# Run tests
yarn test
```

## API Endpoints

### API Documentation

Complete API documentation available at: `/api/docs` (Swagger UI)

### Available Endpoints

```
GET     /api/v1/health-check       # Check API status
```

## Architecture

### Project Structure

```
positions_api/
├── src/
│   ├── Application/     # Application logic, use cases
│   │   ├── shared/     # Shared utilities
│   │   ├── usecases/   # Business logic
│   │   └── validators/ # Request validation
│   ├── Domain/         # Domain models, interfaces
│   ├── Infra/         # Infrastructure layer
│   │   ├── database/   # Database connections
│   │   └── repositories/ # Data access
│   └── Presentation/   # API layer
│       ├── controllers/ # Request handlers
│       ├── middlewares/ # Express middlewares
│       └── routes/     # API routes
├── prisma/            # Database schema
├── tests/            # Test files
└── docker/           # Docker configuration
```

### Clean Architecture Layers

1. **Presentation Layer** (`/Presentation`)

   - REST controllers
   - Route definitions
   - Request/Response handling

2. **Application Layer** (`/Application`)

   - Use cases
   - Business rules
   - Request validation
   - Service orchestration

3. **Domain Layer** (`/Domain`)

   - Business entities
   - Value objects
   - Interfaces

4. **Infrastructure Layer** (`/Infra`)
   - Database access
   - External services
   - Implementations

## Development Workflow

1. Create feature branch from `develop`
2. Write tests for new functionality
3. Implement feature following TDD
4. Run linting and tests
5. Create PR for code review
6. Merge to `develop` after approval
7. Deploy to staging for QA
8. Release to production via `main` branch

## Error Handling

Status codes:

- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 422: Unprocessable Entity
- 500: Internal Server Error

## Logging

Application logs are stored in PostgreSQL using the `application_log` table.

## Development

Code style enforced with ESLint and Prettier.

## Deployment

Deployment via Docker container and PM2 process manager.
