// health/prisma.health.ts
import { Injectable } from '@nestjs/common';
import { HealthIndicatorResult } from '@nestjs/terminus';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PrismaHealthIndicator {
  constructor(private readonly database: DatabaseService) {}

  async isHealthy(key = 'prisma'): Promise<HealthIndicatorResult> {
    try {
      await this.database.$queryRaw`SELECT 1`; // checa se o DB responde
      return {
        [key]: {
          status: 'up',
        },
      };
    } catch (error) {
      return {
        [key]: {
          status: 'down',
          message: error.message,
        },
      };
    }
  }
}
