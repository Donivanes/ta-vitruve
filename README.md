# Project Name

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Step by step](#setup)
- [Running the Project](#running-the-project)
- [Running Tests](#running-tests)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v20 used in this project)
- [pnpm](https://pnpm.io/) (v9 used in this project)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/) (optional, for cloning the repository)

## Installation

1. **Clone the Repository**

   ```bash
   git clone git@github.com:Donivanes/ta-vitruve.git
   ```

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

3. **Start the Project**

   To start the project, run the following command:

   ```bash
   make setup
   ```

   This command will start the project, build the frontend, backend and seed the database with fake data.
   I have run this command several time, and if it fails, run it again.
   If you want to do it manually, follow the steps the step by step setup.

4. **To stop the Project**

   To stop the project, run the following command:

   ```bash
   make stop
   ```

   This command will stop the project and remove the Docker containers.

5. **To restart the Project**

   To start the project, run the following command:

   ```bash
   make start
   ```

   This command will start the project, without doing the setup again.

6. **To delete the Docker Containers and Images**

   To remove the Docker containers, run the following command:

   ```bash
   make delete
   ```

   This command will remove the Docker containers and images.

## Step by step setup

### Configure Environment Variables

Navigate to the `packages/database` directory:

```bash
cd packages/database
```

Create a `.env` file by copying the provided example:

```bash
cp .env.example .env
```

### Docker Setup

Return to the root directory of the project:

```bash
cd ../../
```

Start the Docker containers using Docker Compose:

```bash
docker compose up
```

This command will build and start all the services defined in the `docker-compose.yml` file.
After the containers are up and running, the frontend project will be accessible at [http://localhost:5173](http://localhost:5173)
and the backend project will be accessible at [http://localhost:3000](http://localhost:3000), but before that you need to setup the database.

### Database Setup

Once the Docker containers are up and running, execute the following commands to set up the database:

```bash
pnpm db:generate   # Generates the Prisma client
pnpm db:deploy     # Applies database migrations
pnpm db:seed       # Seeds the database with fake data
```

## Running the Project

Now access to the project at [http://localhost:5173](http://localhost:5173) and you will be able to see the project running, with the fake data seeded in the database.

## Running Tests

The project includes both end-to-end (E2E) tests using Cypress and API tests. Here's how to run them:

### End-to-End Tests (Cypress)

#### Run Tests in Headless Mode

```bash
pnpm test:e2e
```

#### Run Tests with Cypress UI

```bash
pnpm test:e2e:open
```

This command will open the Cypress Test Runner, allowing you to interact with the tests through a graphical interface.

### Server Tests

In order to run the server tests, you need stop the project and run the following command:

```bash
make stop:
```

This command will stop the project and remove the Docker containers (not the images).

After that, to run the api server test, run the following command:

```bash
pnpm test:server
```
