import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DatabaseService } from 'src/database/database.service';
import { ProductClient } from 'src/coupon/http/product.service';
import { v4 as uuidv4 } from 'uuid';
import { GetCouponDto, CouponDto } from './dto';


@Injectable({})
export class CouponService {
  constructor(
    private database: DatabaseService,
    private readonly productService: ProductClient
  ) { }

  private readonly logger = new Logger(CouponService.name);

  async listCoupons(query: GetCouponDto) {
    const { page = 1, limit = 10 } = query;

    const [items, total] = await Promise.all([
      this.database.coupon.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.database.coupon.count(),
    ]);

    return {
      data: items,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async getCouponById(id: string) {
    try {
      const coupon = await this.database.coupon.findFirst({
        where: {
          id: {
            equals: id,
          },
        },
      });
      return coupon;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2023':
            this.logger.log(error.message);
            throw new BadRequestException(`Coupon not found:`);
          default:
            throw error;
        }
      }
    }
  }

  async createCoupon(dto: CouponDto) {
    try {
      //const isValid = await this.productService.validateProducts(dto.products);

      //if (!isValid) {
     //   throw new BadRequestException('Um ou mais produtos são inválidos.');
    //  }
      const coupons = await Promise.all(
        dto.products.map(async (productId) => {
          const id = uuidv4();
          return this.database.coupon.create({
            data: {
              id: id,
              code: dto.code,
              type: dto.type,
              value: dto.value,
              start_date: dto.start_date,
              end_date: dto.end_date,
              limit: dto.limit,
              used: dto.used ?? 0,
              product_id: productId,
            },
          });
        }),
      );

      return coupons;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            throw new BadRequestException(
              `Campo único duplicado: ${error.message} `,
            );
          case 'P2003':
            throw new BadRequestException(
              `Produto não encontrado: ${error.message}`,
            );
          default:
            throw error;
        }
      }
      throw error;
    }
  }

  async validateCoupon(code: string, product_id: string) {
    try {
      const now = new Date();
      const coupon = await this.database.coupon.findFirst({
        where: {
          code: {
            equals: code,
          },
          product_id: {
            equals: product_id,
          },
          start_date: { lte: now },
          end_date: { gte: now },
        },
      });

      if (!coupon || coupon.used >= (coupon.limit ?? 0)) {
        throw new Error('Invalid coupon or usage limit exceeded');
      }

      return coupon;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2023':
            this.logger.log(error.message);
            throw new BadRequestException(`Coupon not found:`);
          default:
            throw error;
        }
      }
    }
  }

  async redeemCupon(id: string){
    return this.database.coupon.update({
      where: { id },
      data: { used: { increment: 1 } },
    });
  }
}
