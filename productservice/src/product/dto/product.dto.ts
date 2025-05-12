import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class ProductDto {
  @ApiProperty({ description: 'Product ID' })
  @IsUUID('4')
  id: string;

  @ApiProperty({ description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  @Length(3)
  name: string;

  @ApiProperty({ description: 'Product description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Product price' })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @ApiProperty({ description: 'Product available' })
  @IsNotEmpty()
  @IsBoolean()
  available: boolean;

  @ApiProperty({ description: 'Establishment id' })
  @IsString()
  @IsNotEmpty()
  establishment_id: string;
}
