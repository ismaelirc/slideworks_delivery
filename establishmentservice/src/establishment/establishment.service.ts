import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuidv4 } from 'uuid';
import { EstablishmentDto, GetEstablishmentDto } from './dto';

@Injectable({})
export class EstablishmentService {
  constructor(private database: DatabaseService) { }
  private readonly logger = new Logger(EstablishmentService.name);

  async listEstablishments(query: GetEstablishmentDto) {
    const { page = 1, limit = 10 } = query;

    const [items, total] = await Promise.all([
      this.database.establishment.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          name: 'asc',
        },
      }),
      this.database.establishment.count(),
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

  async getEstablishmentById(id: string) {
    try {
      const establishment = await this.database.establishment.findFirst({
        where: {
          id: {
            equals: id,
          },
        },
      });
      return establishment;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2023':
            this.logger.log(error.message);
            throw new BadRequestException(`Establishment not found:`);
          default:
            throw error;
        }
      }
    }
  }

  async createEstablishment(dto: EstablishmentDto) {
    const id = uuidv4();
    try {
      const establishment = await this.database.establishment.create({
        data: {
          id: id,
          name: dto.name,
          document: dto.document,
          address: dto.address,
          phone: dto.phone,
        },
      });

      return establishment;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error);
        switch (error.code) {
          case 'P2002':
            throw new BadRequestException(
              `Campo único duplicado: ${error.message} `,
            );
          default:
            throw error;
        }
      }
    }
  }
}
