# Student Task Planner

A Next.js + Tailwind CSS dashboard that highlights curriculum tasks for students in a polished, responsive table. The project is configured for containerized deployment with Docker.

## Features

- Responsive task table backed by PostgreSQL with curriculum, task, platform, and due dates
- Tailwind CSS styling with subtle gradients and hover states
- REST API under `/api/tasks` for external integrations and automation
- Dockerfile plus Kubernetes manifests for containerized deployments

## Local Development

```bash
cp .env.example .env
# Update DATABASE_URL to point at your Postgres instance
npm install

# (Optional) create the tasks table if this is a fresh database
psql "$DATABASE_URL" -f db/schema.sql

npm run dev
```

Visit `http://localhost:3000` to view the planner. Tasks are loaded from the `tasks` table defined in `db/schema.sql`.

## Production Build

```bash
npm run lint
npm run build
npm run start
```

## Environment Variables

| Name | Required | Description |
| ---- | -------- | ----------- |
| `DATABASE_URL` | Yes | PostgreSQL connection string (`postgresql://user:password@host:5432/database`). |
| `PGSSLMODE` | No | Set to `require` if your cluster enforces SSL. |

Set these in `.env` for local work or provide them as container environment variables in production.

## Database Schema

Run `db/schema.sql` against your Postgres cluster to create the `tasks` table and update trigger used by the app.

To seed initial data, insert rows manually or POST to `/api/tasks` with a JSON body such as:

```bash
curl -X POST \
	-H "Content-Type: application/json" \
	-d '{
		"curriculum": "Mathematics",
		"task": "Algebra mastery practice",
		"platform": "Khan Academy",
		"dueDate": "2025-11-15"
	}' \
	http://localhost:3000/api/tasks
```

## Container Images

Build and run the container locally:

```bash
docker build -t weekly-app .
docker run --rm -p 3000:3000 --env-file .env weekly-app
```

Ensure the `DATABASE_URL` that the container sees points to a reachable database. For Kubernetes usage, push the image to a registry accessible by your cluster.

## Kubernetes Deployment

The `k8s/` directory contains manifests for running Postgres and the Next.js app in separate pods:

- `k8s/postgres-secret.yaml` – stores database credentials and the shared `DATABASE_URL`.
- `k8s/postgres-statefulset.yaml` – deploys Postgres with persistent storage and a ClusterIP service.
- `k8s/app-deployment.yaml` – deploys the Next.js container and wires in the database secret.
- `k8s/app-service.yaml` – exposes the web app internally; change the type to `LoadBalancer` or add an Ingress for external access.

Apply them in order once you have updated image names, passwords, and storage classes:

```bash
kubectl apply -f k8s/postgres-secret.yaml
kubectl apply -f k8s/postgres-statefulset.yaml
kubectl rollout status statefulset/weekly-postgres
kubectl apply -f k8s/app-deployment.yaml
kubectl apply -f k8s/app-service.yaml
```

Inspect pod logs with `kubectl logs` to verify the app connects successfully to Postgres.

## Continuous Integration

Every push and pull request to `main` runs the GitHub Actions workflow in `.github/workflows/ci.yml`, which executes `npm ci`, `npm run lint`, and `npm run build` to catch regressions early.
