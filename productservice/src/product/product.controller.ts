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
import { GetProductDto, ProductDto } from './dto';
import { ErrorResponseDto } from './dto/errorResponse.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ProductService } from './product.service';

@ApiTags('products')
@Controller({
  version: '1',
  path: 'product',
})
export class ProductControllerV1 {
  constructor(private productService: ProductService) { }
  private readonly logger = new Logger(ProductControllerV1.name);

  @ApiOperation({ summary: 'List products' })
  @ApiResponse({
    status: 201,
    type: PaginationDto,
  })
  @ApiResponse({ status: 400 })
  @Get()
  listProducts(@Query() query: GetProductDto) {
    this.logger.log(`Listing products`);
    return this.productService.listProducts(query);
  }

  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({
    status: 200,
    type: ProductDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
    type: ErrorResponseDto,
  })
  @Get('/:id')
  async getProductById(@Param('id') id: string) {
    this.logger.log(`Search product by id: ${id}`);
    const product = await this.productService.getProductById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    type: ProductDto,
  })
  @ApiResponse({ status: 400 })
  @Post()
  async createProduct(@Body() dto: ProductDto) {
    this.logger.log('Creating Product:');
    const product = await this.productService.createProduct(dto);
    if (!product) {
      throw new NotFoundException('Establishment not found');
    }

    this.logger.log('Product created:', { product });
    return product;
  }

  @ApiOperation({ summary: 'Validate produts' })
  @ApiResponse({
    status: 200,
  })
  @Post('validate')
  async validateProducts(@Body() body: { ids: string[] }) {
    this.logger.log('Validate coupons products:', body.ids);
    const validIds = await this.productService.findValidIds(body.ids);
    return { valid: validIds.length === body.ids.length };
  }
}
