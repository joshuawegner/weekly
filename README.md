# Weekly – Student Task Planner

A Next.js + Tailwind CSS application for tracking student tasks in a clean, responsive table. Data is persisted in PostgreSQL and exposed through a simple REST API.

## ⚠️ Important Note
This app was developed rapidly with AI assistance by a developer still learning web and deployment best practices. It should be treated as a proof of concept, not a production-ready system. Proceed with caution, and under no circumstances deploy it to production without a thorough review.
## What’s inside

- Next.js 16 (App Router) with React 19
- Tailwind CSS 4 for styling
- PostgreSQL via `pg`
- REST API at `/api/tasks`
- Dockerfile for containerized deployment

## Architecture

- UI: `src/app/page.tsx` renders a task table with curriculum, task, platform, and due date.
- API: Next.js Route Handlers
  - `GET /api/tasks` – list
  - `POST /api/tasks` – create
  - `DELETE /api/tasks/{id}` – delete
- Data: `db/schema.sql` defines the `tasks` table; `scripts/apply-schema.mjs` applies the schema.
- DB Access: `src/lib/db.ts` (Pool) and `src/lib/tasks.ts` (queries and mapping).
- Container: On startup the container runs `scripts/apply-schema.mjs` then boots the server.

## Requirements

- Node.js 20+
- PostgreSQL 14+ (local, remote, or a Docker container)
- Windows PowerShell (examples assume your default shell)

## Environment variables

Set these for local dev and production:

- `DATABASE_URL` (required) – `postgresql://USER:PASSWORD@HOST:5432/DBNAME`
- `PGSSLMODE` (optional) – set to `require` for managed databases that enforce TLS

Examples (PowerShell):

```powershell
$env:DATABASE_URL = "postgresql://weekly:secret@localhost:5432/weekly"
# Optional for managed DBs
$env:PGSSLMODE = "require"
```

You can also place these in a local `.env` for your own workflow (not committed).

## Database setup

Option A – Use an existing PostgreSQL instance: point `DATABASE_URL` at it.

Option B – Start a local PostgreSQL in Docker (PowerShell):

```powershell
docker run --name weekly-postgres -e POSTGRES_USER=weekly -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=weekly -p 5432:5432 -d postgres:16
$env:DATABASE_URL = "postgresql://weekly:secret@localhost:5432/weekly"
```

Apply the schema (choose one):

- Using Node script (recommended):

```powershell
node .\scripts\apply-schema.mjs
```

- Using psql (if installed locally):

```powershell
psql $env:DATABASE_URL -f .\db\schema.sql
```

## Run locally

Install deps and start the dev server:

```powershell
npm install
npm run dev
```

Then open http://localhost:3000.

Tip: In VS Code, you can run the preconfigured task “npm: dev” (Terminal > Run Task).

## API quickstart

Swagger/OpenAPI: see `openapi.yaml` for a full spec. A few handy calls:

- List tasks

```powershell
Invoke-RestMethod -Method GET http://localhost:3000/api/tasks
```

- Create a task

```powershell
$body = @{ curriculum = "Algebra II"; task = "Worksheet 5"; platform = "Khan Academy"; dueDate = "2025-01-15" } | ConvertTo-Json
Invoke-RestMethod -Method POST -Uri http://localhost:3000/api/tasks -ContentType 'application/json' -Body $body
```

- Delete a task

```powershell
Invoke-RestMethod -Method DELETE http://localhost:3000/api/tasks/42
```

Validation highlights:

- `dueDate` must be an ISO date (`YYYY-MM-DD`).
- DELETE requires a positive integer id; returns 204 on success, 404 if not found.

## Build for production

```powershell
npm run build
npm run start
```

## Container usage

Build and run the image directly (recommended):

```powershell
docker build -t weekly-app .
docker run --rm -p 3000:3000 -e DATABASE_URL=$env:DATABASE_URL -e PGSSLMODE=$env:PGSSLMODE weekly-app
```

Notes:

- The container will apply the schema on startup before launching the app.
- Ensure the database in `DATABASE_URL` is reachable from the container.

Compose: A minimal `docker-compose.yml` is included for the web service. Since it doesn’t inject `DATABASE_URL`, prefer `docker run` as above or extend Compose locally to pass env vars.

## Troubleshooting

- “DATABASE_URL is not defined”: Set it in your shell or environment and restart the server/container.
- TLS errors to managed Postgres: set `$env:PGSSLMODE = "require"`.
- Port 3000 already in use: stop the conflicting process or run the container with `-p 3001:3000` and open http://localhost:3001.
- Schema apply fails: verify the DB user can create tables and that the database exists.

## License

MIT
