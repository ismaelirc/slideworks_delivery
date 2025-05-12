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
import { EstablishmentDto, GetEstablishmentDto } from './dto';
import { ErrorResponseDto } from './dto/errorResponse.dto';
import { PaginationDto } from './dto/pagination.dto';
import { EstablishmentService } from './establishment.service';

@ApiTags('establishments')
@Controller({
  version: '1',
  path: 'establishment',
})
export class EstablishmentControllerV1 {
  constructor(private establishmentService: EstablishmentService) { }
  private readonly logger = new Logger(EstablishmentControllerV1.name);

  @ApiOperation({ summary: 'List establishments' })
  @ApiResponse({
    status: 201,
    type: PaginationDto,
  })
  @ApiResponse({ status: 400 })
  @Get()
  listEstablishments(@Query() query: GetEstablishmentDto) {
    this.logger.log(`Listing establishments`);
    return this.establishmentService.listEstablishments(query);
  }

  @ApiOperation({ summary: 'Get a establishment by ID' })
  @ApiResponse({
    status: 200,
    type: EstablishmentDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Establishment not found',
    type: ErrorResponseDto,
  })
  @Get('/:id')
  async getEstablishmentById(@Param('id') id: string) {
    this.logger.log(`Search establishment by id: ${id}`);
    const establishment =
      await this.establishmentService.getEstablishmentById(id);

    if (!establishment) {
      throw new NotFoundException('Establishment not found');
    }
    return establishment;
  }

  @ApiOperation({ summary: 'Create a new establishment' })
  @ApiResponse({
    status: 201,
    type: EstablishmentDto,
  })
  @ApiResponse({ status: 400 })
  @Post()
  async createEstablishment(@Body() dto: EstablishmentDto) {
    this.logger.log('Creating establishment:');
    const establishment =
      await this.establishmentService.createEstablishment(dto);
    this.logger.log('Establishment created:', { establishment });
    return establishment;
  }
}
