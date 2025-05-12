import { ApiProperty } from '@nestjs/swagger';
import { GetProductDto } from './getProduct.dto';
import { ProductDto } from './product.dto';

export class PaginationDto {
  @ApiProperty({ type: [ProductDto] })
  data: ProductDto[];

  @ApiProperty({ type: GetProductDto })
  meta: GetProductDto;
}
