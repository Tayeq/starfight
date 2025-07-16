# Starfight Fullstack App

## 🌐 Demo

Public demo is available at: [https://starfight.setdroy.pl/](https://starfight.setdroy.pl/)

This is a fullstack application for comparing random Star Wars people or starships, built with React, Next.js, NestJS, GraphQL, Prisma, and Postgres.

## 🚀 Quick Start

**TL;DR - Run everything with one command:**

```bash
# 1. Start database
docker-compose up -d

# 2. Copy .env.example to .env in all apps/packages
cp apps/web/.env.example apps/web/.env
cp apps/api/.env.example apps/api/.env
cp packages/db/.env.example packages/db/.env

# 3. Setup everything (install deps, generate Prisma, run migrations)
bun run setup

# 4. Start both frontend and backend
bun run dev
```

**That's it!** 🎉

- Frontend: http://localhost:3001
- Backend API: http://localhost:3000
- GraphQL Playground: http://localhost:3000/graphql

---

## Monorepo Structure

- `apps/web` — Frontend (Next.js, React, TypeScript)
- `apps/api` — Backend API (NestJS, GraphQL, TypeScript)
- `packages/db` — Database access (Prisma, Postgres)
- `packages/ui` — Shared UI components (React, MUI)

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed and running
- [Bun](https://bun.sh/) installed

## Getting Started

### 1. Start the Postgres Database

From the project root directory, run:

```sh
docker-compose up -d
```

This will start a local Postgres instance on port 5432 with the following credentials:

- **User:** postgres
- **Password:** postgres
- **Database:** postgres

### 2. Configure Environment Variables

Create `.env` files in the root directory with:

```env
# Database Configuration
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"

# API Configuration (optional)
API_KEY="your-api-key-here"

# Environment
NODE_ENV="development"
```

### 3. Install Dependencies

From the project root, run:

```sh
bun install
```

### 4. Run Prisma Migrations

From the `packages/db` directory, run:

```sh
bunx prisma generate
bunx prisma migrate dev --name init
```

### 5. Start the Backend API

From the project root, run:

```sh
bun run --filter=apps/api start
```

The API will be available at `http://localhost:3000/graphql` (default port, see `apps/api` config).

### 6. Start the Frontend

From the project root, run:

```sh
bun run --filter=apps/web dev
```

The frontend will be available at `http://localhost:3000` (default port, see `apps/web` config).

## Useful Commands

### Development

- `bun run dev` — Start both frontend and backend in development mode
- `bun run build` — Build all packages and applications
- `bun run start` — Start both frontend and backend in production mode
- `bun run setup` — Setup everything (install deps, generate Prisma, run migrations)
- `bun run clean` — Clean up build artifacts
- `bun run reset` — Reset database and migrations

### Testing

- `bun run test` — Run all tests
- `bun run --filter=apps/api test` — Run backend tests only
- `bun run --filter=apps/web test` — Run frontend tests only

### Database

- `bunx prisma studio` (in `packages/db`) — Open Prisma Studio (GUI for your database)
- `bunx prisma migrate dev` (in `packages/db`) — Run database migrations
- `bunx prisma generate` (in `packages/db`) — Generate Prisma client

### Production

- `bun run start:prod` — Start API in production mode
- `bun run build && bun run start` — Build and start everything

## Deployment

### Coolify / Vercel

1. Set environment variables:
   - `DATABASE_URL` — PostgreSQL connection string
   - `API_KEY` — API key for authentication
2. Deploy with build command: `bun run build`
3. Start command: `bun run start:prod` (for API) or `bun run start` (for web)

## Environment Variables

The application requires the following environment variables:

- `DATABASE_URL` — PostgreSQL connection string (required)
- `API_KEY` — API key for authentication (optional)
- `NODE_ENV` — Environment mode (development/production)

Example:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
API_KEY="your-api-key-here"
NODE_ENV="development"
```

## FAQ

### 🐛 Common Issues

**Q: `Environment variable not found: DATABASE_URL`**
A: Make sure you created `.env` file in the root directory and it contains `DATABASE_URL`. Run:

```bash
echo 'DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"' > .env
```

**Q: `Cannot find module '@repo/db'`**
A: Run `bun run setup` to install dependencies and generate Prisma client.

**Q: `Database connection failed`**
A: Make sure PostgreSQL is running:

```bash
docker-compose up -d
```

**Q: `Port 3000 already in use`**
A: Either stop the process using port 3000 or change the port in `apps/api/src/main.ts` and `apps/web/package.json`.

**Q: How to reset everything?**
A: Run `bun run reset` to clean everything and start fresh.

### 🔧 Development Tips

- Use `bun run prisma:studio` to open Prisma Studio (database GUI)
- Use `bun run test` to run all tests
- Use `bun run build` to build everything for production
- Check `turbo.json` for available tasks
