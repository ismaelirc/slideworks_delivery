import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { EstablishmentModule } from './establishment/establishment.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EstablishmentModule,
    HealthModule,
    DatabaseModule,
  ],
  providers: [],
})
export class AppModule { }
