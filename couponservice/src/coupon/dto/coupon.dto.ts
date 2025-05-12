import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsArray,
  Min,
  IsInt,
} from 'class-validator';
import { CouponType } from '@prisma/client';
import { Type } from 'class-transformer';

export class CouponDto {
  @ApiProperty({ description: 'Coupon ID', required: true })
  @IsUUID('4')
  id: string;

  @ApiProperty({
    description: 'List of product IDs associated with this coupon',
    type: [String],
    example: ['123e4567-e89b-12d3-a456-426614174000'],
  })
  @IsArray()
  @IsUUID('4', { each: true })
  @IsNotEmpty()
  products: string[];

  @ApiProperty({ description: 'Unique coupon code' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'Coupon type (percentage or fixed_value)',
    enum: CouponType,
    example: CouponType.percentage
  })
  @IsEnum(CouponType)
  @IsNotEmpty()
  type: CouponType;

  @ApiProperty({ 
    description: 'Coupon value (percentage or fixed amount)',
    minimum: 0,
    example: 10.50
  })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  value: number;

  @ApiProperty({ description: 'Start date of coupon validity' })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  start_date: Date;

  @ApiProperty({ description: 'End date of coupon validity' })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  end_date: Date;

  @ApiProperty({
    description: 'Usage limit of the coupon',
    required: true,
  })
  @IsNumber()
  limit: number;

  @ApiProperty({
    description: 'Count of coupon used',
    default: 0,
  })
  @IsInt()
  @IsOptional()
  used?: number;
}
