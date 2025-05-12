import { Module } from '@nestjs/common';
import { ProductControllerV1 } from './product.controller';
import { ProductService } from './product.service';
import { EstablishmentClient } from './http/establishment.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ProductControllerV1],
  providers: [ProductService, EstablishmentClient],
})
export class ProductModule { }
