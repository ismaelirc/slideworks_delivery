import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class EstablishmentDto {
  @ApiProperty({ description: 'Establishment ID' })
  @IsUUID('4')
  id: string;

  @ApiProperty({ description: 'Establishment name' })
  @IsString()
  @IsNotEmpty()
  @Length(3)
  name: string;

  @ApiProperty({ description: 'Establishment identification document' })
  @IsString()
  @IsNotEmpty()
  document: string;

  @ApiProperty({ description: 'Establishment Address' })
  @IsString()
  @IsNotEmpty()
  @Length(3)
  address: string;

  @ApiProperty({ description: 'Establishment phone number' })
  @IsString()
  @IsNotEmpty()
  @Length(12)
  phone: string;
}
