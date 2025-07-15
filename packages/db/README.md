# Database Package

This package provides database access using Prisma ORM and a local Postgres database (via Docker Compose).

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

## Environment Variables

Copy the example file and create your own `.env`:

```
cp .env.example .env
```

Then, edit the file if needed (e.g. set your DATABASE_URL).

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

This will generate the Prisma client and apply all migrations to your local database.

## Usage

You can now use Prisma Client in your code to access the database. Example:

```typescript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Example query
// const users = await prisma.user.findMany();
```

## Useful Commands

- `bunx prisma studio` — open Prisma Studio (GUI for your database)
- `bunx prisma migrate dev` — run migrations
- `bunx prisma generate` — generate Prisma client

## Notes

- Make sure Docker is running before starting the database.
- You can modify the `prisma/schema.prisma` file to define your own models.
