import { ApiProperty } from '@nestjs/swagger';
import { GetCouponDto } from './getCoupon.dto';
import { CouponDto } from './coupon.dto';

export class PaginationDto {
  @ApiProperty({ type: [CouponDto] })
  data: CouponDto[];

  @ApiProperty({ type: GetCouponDto })
  meta: GetCouponDto;
}
