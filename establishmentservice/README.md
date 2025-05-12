# Establishment Service API

REST API for establishment management, built with NestJS and PostgreSQL.

## 🚀 Technologies

- NestJS
- PostgreSQL
- Prisma ORM
- Docker
- Swagger (API Documentation)

## 📋 Prerequisites

- Docker
- Docker Compose

## 🔧 Installation and Execution

1. Clone the repository
```bash
git clone [repository-url]
cd establishment-service
```

2. Run the project with Docker Compose
```bash
docker-compose up --build
```

The application will be available at `http://localhost:3000/v1`
The Swagger documentation will be available at `http://localhost:3000/v1/docs`

## 📦 Project Structure

```
establishment-service/
├── src/
|   ├── health/
│   │   ├── health.controller.ts
│   │   ├── prisma.health.ts
│   │   └── health.module.ts
│   ├── establishment/
│   │   ├── dto/
│   │   ├── establishment.controller.ts
│   │   ├── establishment.service.ts
│   │   └── establishment.module.ts
│   └── main.ts
├── prisma/
│   └── schema.prisma
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## 📚 API Endpoints

### Health Check
- **GET** `/health`
- Returns the health status of the service and its dependencies
- Checks database connectivity

### List Establishments
```http
GET /v1/establishment
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Establishment Name",
      "document": "12345678901234",
      "address": "Establishment Address",
      "phone": "11999999999"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10
}
```

### Get Establishment by ID
```http
GET /v1/establishment/:id
```

**Response:**
```json
{
  "id": "uuid",
  "name": "Establishment Name",
  "document": "12345678901234",
  "address": "Establishment Address",
  "phone": "11999999999"
}
```

### Create Establishment
```http
POST /v1/establishment
```

**Body:**
```json
{
  "name": "Establishment Name",
  "document": "12345678901234",
  "address": "Establishment Address",
  "phone": "11999999999"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "Establishment Name",
  "document": "12345678901234",
  "address": "Establishment Address",
  "phone": "11999999999"
}
```

## 🗄️ Database

The project uses PostgreSQL as the database. Connection settings are:

- **Host**: localhost
- **Port**: 5432
- **Database**: establishment-db
- **Username**: XXXX-user
- **Password**: XXXX

To access the database using DBeaver or another SQL client:
1. Make sure the container is running
2. Use the credentials above to connect

## 🔍 API Documentation

Complete API documentation is available through Swagger UI at:
```
http://localhost:3000/v1/docs
```

## 🛠️ Development

For local development without Docker:

1. Install dependencies
```bash
pnpm install
```

2. Configure the .env file with the necessary environment variables

3. Run Prisma migrations
```bash
npx prisma migrate deploy
```

4. Start the development server
```bash
pnpm start:dev
```

## Health Monitoring

The service includes a health check endpoint that monitors:
- Database connectivity
- Service status

## 📄 License

This project is licensed under the CC BY-NC-ND 4.0 License.  
Not for commercial use. See the LICENSE file for details.