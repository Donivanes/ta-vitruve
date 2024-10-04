setup: start-docker setup-env setup-db

start-docker:
	docker compose up -d

setup-env:
	cd packages/database && \
	if [ ! -f .env ]; then \
		cp .env.example .env; \
	fi

setup-db:
	pnpm db:generate
	pnpm db:migrate:deploy
	pnpm db:seed

run:
	echo "All services are up and running."
	echo "Frontend accessible at http://localhost:5173"
	echo "Backend accessible at http://localhost:3000"
