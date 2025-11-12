# Student Task Planner

A Next.js + Tailwind CSS dashboard that highlights curriculum tasks for students in a polished, responsive table. The project is configured for containerized deployment with Docker.

## Features

- Responsive task table with curriculum, task, platform, and due dates
- Tailwind CSS styling with subtle gradients and hover states
- Updated metadata for improved link previews and bookmarking
- Dockerfile and docker-compose setup for repeatable deployments

## Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to view the planner. Edit `src/app/page.tsx` to adjust the task list.

## Production Build

```bash
npm run lint
npm run build
npm run start
```

## Docker

Build and run the container manually:

```bash
docker build -t student-task-planner .
docker run -p 3000:3000 student-task-planner
```

Or use Docker Compose:

```bash
docker compose up --build
```

The app serves on port `3000` by default.

## Continuous Integration

Every push and pull request to `main` runs the GitHub Actions workflow in `.github/workflows/ci.yml`, which executes `npm ci`, `npm run lint`, and `npm run build` to catch regressions early.
