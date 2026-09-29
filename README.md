# Digital Business Card API

## Quick Start

```bash
cp .env.example .env
docker compose up --build
```

After startup:

- Apollo Sandbox: `http://localhost:${APP_PORT}/graphql`
- PostgreSQL: `localhost:${POSTGRES_PORT}`

The default values from `.env.example` expose the application on port `3000`
and PostgreSQL on port `5433`. The local `.env` file is ignored by Git.

To stop the stack:

```bash
docker compose down
```

To remove the local database volume as well:

```bash
docker compose down -v
```

## GraphQL API

Open Apollo Sandbox and run:

```graphql
query {
  profile {
    name
    description
    links
    skills {
      name
    }
    experience {
      company
      position
      startDate
      endDate
      achievements
    }
    projects {
      name
      url
    }
  }
}
```

The API exposes one read-only profile with related skills, work experience and
projects. The database is initialized and filled automatically before NestJS
starts.

## Architecture

The project is a modular monolith with a hexagonal structure around the profile
module:

```text
GraphQL Resolver
    -> ProfileUseCases
        -> ProfileRepository port
            -> PrismaProfileRepository
                -> PrismaService -> PostgreSQL
```

Relevant locations:

```text
src/infrastructure/prisma/        Prisma client and database module
src/modules/profile/domain/       Profile, Skill, Experience and Project entities
src/modules/profile/application/  Profile use case
src/modules/profile/adapters/     GraphQL and Prisma adapters
prisma/schema.prisma              Current database schema
prisma/migrations/                Schema migrations and profile seed data
```

Resolvers handle GraphQL transport, use cases contain application logic, and
the repository adapter is responsible for Prisma data access.

## Database Initialization

The Docker image runs the following command before starting NestJS:

```bash
prisma migrate deploy && node dist/main.js
```

Migrations create the database structure and seed the profile data from the
resume. A clean database is prepared automatically on the first startup.

## Development Commands

```bash
npm install
npm run start:dev
npm run build
npm test
npm run test:e2e
npm run lint
```

`npm run test` covers the application use case, while `npm run test:e2e` checks
that the NestJS GraphQL application starts and serves Apollo Sandbox.

## Environment

Copy `.env.example` to `.env` and adjust values when needed:

```env
APP_PORT=3000
POSTGRES_DB=profile
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_PORT=5433
```

`OBSERVE_APP_KEY` and `OBSERVE_APP_SECRET` are optional.
