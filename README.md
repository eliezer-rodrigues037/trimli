# Trimli

A minimal [NestJS](https://nestjs.com/) **URL shortener API**. Includes:

---

## Quick Start

> **Note:** If you are running this project on Windows, you will need to set up [Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/en-us/windows/wsl/install). Follow the official Microsoft guide for installation and best practices.

**Requirements:**

- Node.js >= 22.17.0
- Yarn >= 4.9.2
- Docker (for local MySQL setup)

### 1. Install dependencies

```bash
$ yarn install
```

### 2. Configure environment

Copy the `.env.exemple` file in the project root as `.env`.

### 3. Start the database (MySQL in Docker)

From the `trimli-docker/` directory:

```bash
$ make ensure-docker-network
$ make mysql-on-docker
```

This will start a MySQL 8.0 container with default credentials and database name as defined in the Makefile.

### 4. Run the application

```bash
# Development
$ yarn start:dev

# Production
$ yarn build && yarn start:prod
```

### 5. Use Trimli API

The server will be up and running at [http://localhost:3000](http://localhost:3000)

You can access the api using the SwaggerUI at [http://localhost:3000/api](http://localhost:3000/api)

### 6. Run tests

```bash
$ yarn test         # Unit tests
$ yarn test:e2e     # End-to-end tests
$ yarn test:cov     # Coverage
```

## Feature Roadmap

- [x] Add the user entity attached to the link entity
- [x] Add an authentication system
- [x] Add protection to link edit/delete/list endpoints
- [x] Add tracking to the redirect URL for calls from authenticated users
- [ ] Add exception filters
- [ ] Add response hydrations
