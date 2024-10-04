setup: start-docker setup-env setup-db
start: start-docker
stop: stop-docker
delete: delete-docker

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

stop-docker:
	docker compose down

delete-docker:
	docker compose down --rmi all --volumes --remove-orphans