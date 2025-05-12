import {
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetCouponDto, CouponDto } from './dto';
import { ErrorResponseDto } from './dto/errorResponse.dto';
import { PaginationDto } from './dto/pagination.dto';
import { CouponService } from './coupon.service';
import { CouponRedeemDto } from './dto/couponRedeem.dto';

@ApiTags('coupons')
@Controller({
  version: '1',
  path: 'coupon',
})
export class CouponControllerV1 {
  constructor(private couponService: CouponService) { }
  private readonly logger = new Logger(CouponControllerV1.name);

  @ApiOperation({ summary: 'List coupons' })
  @ApiResponse({
    status: 201,
    type: PaginationDto,
  })
  @ApiResponse({ status: 400 })
  @Get()
  listCoupons(@Query() query: GetCouponDto) {
    this.logger.log(`Listing couponss`);
    return this.couponService.listCoupons(query);
  }

  @ApiOperation({ summary: 'Get a coupon by ID' })
  @ApiResponse({
    status: 200,
    type: CouponDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Coupon not found',
    type: ErrorResponseDto,
  })
  @Get('/:id')
  async getCouponById(@Param('id') id: string) {
    this.logger.log(`Search coupon by id: ${id}`);
    const coupon = await this.couponService.getCouponById(id);

    if (!coupon) {
      throw new NotFoundException('Coupon not found');
    }
    return coupon;
  }

  @ApiOperation({ summary: 'Create a new coupon' })
  @ApiResponse({
    status: 201,
    type: CouponDto,
  })
  @ApiResponse({ status: 400 })
  @Post()
  async createCoupon(@Body() dto: CouponDto) {
    this.logger.log('Creating coupon:');
    const coupon = await this.couponService.createCoupon(dto);
    if (!coupon) {
      throw new NotFoundException('Coupon not found');
    }

    this.logger.log('Coupon created:', { coupon });
    return coupon;
  }

  @ApiOperation({ summary: 'Redeem a coupon' })
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({
    status: 400,
    type: ErrorResponseDto,
  })
  @Post('redeem/:coupon/:product')
  async redeemCoupon(
    @Param('coupon') code: string,
    @Param('product') product_id: string,
  ) {
    this.logger.log(`Redeem a coupon: ${code} to product: ${product_id}`);
    const valid = await this.couponService.validateCoupon(code, product_id);
    if (!valid) {
      throw new NotFoundException('Invalid coupon or expired');
    }

    await this.couponService.redeemCupon(valid.id);

    return {
      message: 'Coupon redeemed',
    };
  }
}
