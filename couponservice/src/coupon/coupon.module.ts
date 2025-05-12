import { Module } from '@nestjs/common';
import { CouponControllerV1 } from './coupon.controller';
import { CouponService } from './coupon.service';
import { HttpModule } from '@nestjs/axios';
import { ProductClient } from './http/product.service';

@Module({
  imports: [HttpModule],
  controllers: [CouponControllerV1],
  providers: [CouponService, ProductClient],
})
export class CouponModule { }
