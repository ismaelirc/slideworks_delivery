import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuidv4 } from 'uuid';
import { GetProductDto, ProductDto } from './dto';
import { EstablishmentClient } from './http/establishment.service';


@Injectable({})
export class ProductService {
  constructor(
    private database: DatabaseService,
    private readonly establishmentClient: EstablishmentClient,
  ) { }
  private readonly logger = new Logger(ProductService.name);

  async listProducts(query: GetProductDto) {
    const { page = 1, limit = 10 } = query;

    const [items, total] = await Promise.all([
      this.database.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          name: 'asc',
        },
      }),
      this.database.product.count(),
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

  async getProductById(id: string) {
    try {
      const product = await this.database.product.findFirst({
        where: {
          id: {
            equals: id,
          },
        },
      });
      return product;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2023':
            this.logger.log(error.message);
            throw new BadRequestException(`Product not found:`);
          default:
            throw error;
        }
      }
    }
  }

  async createProduct(dto: ProductDto) {
    const id = uuidv4();
    try {
      await this.establishmentClient.checkIfExists(dto.establishment_id);

      const product = await this.database.product.create({
        data: {
          id: id,
          name: dto.name,
          description: dto.description,
          price: dto.price,
          available: dto.available,
          establishment_id: dto.establishment_id,
        },
      });

      return product;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            throw new BadRequestException(
              `Campo único duplicado: ${error.message} `,
            );
          default:
            throw error;
        }
      }
      throw new NotFoundException('Establishment not found');
    }
  }
  async findValidIds(ids: string[]): Promise<string[]> {
    const products = await this.database.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      select: {
        id: true,
      },
    });

    return products.map((product) => product.id);
  }
}
