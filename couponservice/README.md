# Coupon Service

A NestJS-based microservice for managing coupons and promotions.

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
cd coupon-service
```

2. Run the project with Docker Compose
```bash
docker-compose up --build
```

The application will be available at `http://localhost:3002/v1`
The Swagger documentation will be available at `http://localhost:3002/v1/docs`

## 📦 Project Structure

```
coupon-service/
├── src/
|   ├── health/
│   │   ├── health.controller.ts
│   │   ├── prisma.health.ts
│   │   └── health.module.ts
│   ├── establishment/
│   │   ├── dto/
│   │   ├── coupon.controller.ts
│   │   ├── coupon.service.ts
│   │   └── coupon.module.ts
│   └── main.ts
├── prisma/
│   └── schema.prisma
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## API Endpoints

### Health Check
- **GET** `/health`
- Returns the health status of the service and its dependencies
- Checks database connectivity

### List Coupons
- **GET** `/coupon`
- Query Parameters:
  - `page` (default: 1)
  - `limit` (default: 10)
- Returns paginated list of coupons with metadata

### Get Coupon by ID
- **GET** `/coupon/:id`
- Returns coupon details if found

### Create Coupon
- **POST** `/coupon`
- Body:
  ```json
  {
    "code": "string",
    "type": "string",
    "value": "number",
    "start_date": "date",
    "end_date": "date",
    "limit": "number",
    "used": "boolean",
    "products": ["productId1", "productId2"]
  }
  ```

### Validate Coupon
- **GET** `/coupon/validate/:code`
- Validates if a coupon is:
  - Active (within start and end dates)
  - Not used
  - Exists

### Redeem Coupon
- **POST** `/coupon/redeem/:coupon/:product`
- Marks a coupon as used

## Error Handling

The service handles various error cases:
- Invalid coupon codes
- Duplicate coupon codes
- Invalid product references
- Not found errors

## 🗄️ Database

The project uses PostgreSQL as the database. Connection settings are:

- **Host**: localhost
- **Port**: 5435
- **Database**: coupon-db
- **Username**: XXXX-user
- **Password**: XXXX

To access the database using DBeaver or another SQL client:
1. Make sure the container is running
2. Use the credentials above to connect

## 🔍 API Documentation

Complete API documentation is available through Swagger UI at:
```
http://localhost:3002/v1/docs
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