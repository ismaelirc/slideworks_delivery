# Build stage
FROM node:20-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package*.json pnpm-lock.yaml ./
COPY prisma ./prisma/

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Generate Prisma client
RUN pnpm prisma generate

# Build the application
RUN pnpm build

# Production stage
FROM node:20-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package*.json pnpm-lock.yaml ./
COPY prisma ./prisma/

# Copy node_modules from builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy built application
COPY --from=builder /app/dist ./dist

# Create startup script with proper line endings
RUN echo -e '#!/bin/sh\npnpm prisma migrate deploy\npnpm start:prod' > /app/start.sh && \
    chmod +x /app/start.sh && \
    dos2unix /app/start.sh

# Install dos2unix
RUN apk add --no-cache dos2unix

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["/bin/sh", "/app/start.sh"] 