# Starfight Fullstack App

This is a fullstack application for comparing random Star Wars people or starships, built with React, Next.js, NestJS, GraphQL, Prisma, and Postgres.

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

Create a `.env` file in `packages/db` with the following content:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
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

- `bun run --filter=apps/api test` — run backend tests
- `bun run --filter=apps/web test` — run frontend tests
- `bunx prisma studio` (in `packages/db`) — open Prisma Studio (GUI for your database)

# Example Environment Files

Each app/package contains an `.env.example` file with example environment variables. To configure your environment, copy the example file to `.env` and adjust the values as needed:

- `apps/web/.env.example` → `apps/web/.env`
- `apps/api/.env.example` → `apps/api/.env`
- `packages/db/.env.example` → `packages/db/.env`

Example command:

```sh
cp apps/web/.env.example apps/web/.env
cp apps/api/.env.example apps/api/.env
cp packages/db/.env.example packages/db/.env
```

Make sure to update the values to match your local setup if needed.
