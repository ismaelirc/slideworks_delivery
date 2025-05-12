import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductClient {
  constructor(
    private readonly httpService: HttpService,
    private config: ConfigService,
  ) {}

  async validateProducts(productIds: string[]): Promise<boolean> {
    try {
      const url = this.config.get<string>('PRODUCT_SERVICE_URL');
      if (!url) {
        throw new Error('PRODUCT_SERVICE_URL is not defined');
      }

      const response = await firstValueFrom(
        this.httpService.post(url, { ids: productIds }),
      );
      return response.data.valid;
    } catch (error) {
      throw new BadRequestException('Erro ao validar os produtos');
    }
  }
}