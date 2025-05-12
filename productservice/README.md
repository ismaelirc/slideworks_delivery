# Product Service API

REST API for products management, built with NestJS and PostgreSQL.

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
cd prodcut-service
```

2. Run the project with Docker Compose
```bash
docker-compose up --build
```

The application will be available at `http://localhost:3001/v1`
The Swagger documentation will be available at `http://localhost:3001/v1/docs`

## 📦 Project Structure

```
product-service/
├── src/
|   ├── health/
│   │   ├── health.controller.ts
│   │   ├── prisma.health.ts
│   │   └── health.module.ts
│   ├── product/
│   │   ├── dto/
│   │   ├── http/
│   │   ├── product.controller.ts
│   │   ├── product.service.ts
│   │   └── product.module.ts
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

#### List Products
- **GET** `/v1/product`
- **Query Parameters:**
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 10)
- **Response:**
  ```json
  {
    "data": [
      {
        "id": "uuid",
        "name": "string",
        "description": "string",
        "price": number,
        "available": boolean,
        "establishment_id": "string"
      }
    ],
    "meta": {
      "total": number,
      "page": number,
      "lastPage": number
    }
  }
  ```

#### Get Product by ID
- **GET** `/v1/product/:id`
- **Response:**
  ```json
  {
    "id": "uuid",
    "name": "string",
    "description": "string",
    "price": number,
    "available": boolean,
    "establishment_id": "string"
  }
  ```

#### Create Product
- **POST** `/v1/product`
- **Body:**
  ```json
  {
    "name": "string",
    "description": "string",
    "price": number,
    "available": boolean,
    "establishment_id": "string"
  }
  ```
- **Response:** Created product object
- **Status Codes:**
  - 201: Product created successfully
  - 400: Invalid request data
  - 404: Establishment not found


#### Validate Products
- **POST** `/v1/product/validate`
- **Body:**
  ```json
  {
    "ids": ["uuid1", "uuid2"]
  }
  ```
- **Response:**
  ```json
  {
    "valid": boolean
  }
  ```

## Error Responses

The API uses standard HTTP status codes and returns error responses in the following format:

```json
{
  "statusCode": number,
  "message": "string",
  "error": "string"
}
```

Common error codes:
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

## 🗄️ Database

The project uses PostgreSQL as the database. Connection settings are:

- **Host**: localhost
- **Port**: 5434
- **Database**: product-db
- **Username**: XXXX-user
- **Password**: XXXX

To access the database using DBeaver or another SQL client:
1. Make sure the container is running
2. Use the credentials above to connect

## 🔍 API Documentation

Complete API documentation is available through Swagger UI at:
```
http://localhost:3001/v1/docs
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

## 📄 License

This project is licensed under the CC BY-NC-ND 4.0 License.  
Not for commercial use. See the LICENSE file for details.