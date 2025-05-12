import { Module } from '@nestjs/common';
import { EstablishmentControllerV1 } from './establishment.controller';
import { EstablishmentService } from './establishment.service';

@Module({
  controllers: [EstablishmentControllerV1],
  providers: [EstablishmentService],
})
export class EstablishmentModule { }
