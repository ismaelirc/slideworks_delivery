import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CouponRedeemDto {
  @ApiProperty({ description: 'Coupon' })
  @IsString()
  @IsNotEmpty()
  @Length(3)
  code: string;
}
