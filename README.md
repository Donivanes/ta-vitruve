# Project Name

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup](#setup)
- [Running the Project](#running-the-project)
- [Running Tests](#running-tests)
- [License](#license)

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

## Setup

### Configure Environment Variables

Navigate to the `packages/database` directory:

```bash
cd packages/database
```

Create a `.env` file by copying the provided example:

```bash
cp .env.example .env
```

Open the `.env` file and configure the necessary environment variables as per your setup.

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

To run the server-side tests, execute:

```bash
pnpm test:server
```

This will run all the tests related to the server api of the project.
