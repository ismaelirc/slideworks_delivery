import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EstablishmentClient {
  constructor(
    private readonly http: HttpService,
    private config: ConfigService,
  ) {}

  async checkIfExists(establishmentId: string): Promise<void> {
    try {
      const url = this.config.get<string>('ESTABLISHMENT_SERVICE_URL');
      if (!url) {
        throw new Error('ESTABLISHMENT_SERVICE_URL is not defined');
      }

      await firstValueFrom(this.http.get(`${url}/${establishmentId}`));
    } catch (error) {
      throw new NotFoundException('Establishment not found');
    }
  }
}