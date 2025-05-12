import { ApiProperty } from '@nestjs/swagger';
import { EstablishmentDto } from './establishment.dto';
import { GetEstablishmentDto } from './getEstablishment.dto';

export class PaginationDto {
  @ApiProperty({ type: [EstablishmentDto] })
  data: EstablishmentDto[];

  @ApiProperty({ type: GetEstablishmentDto })
  meta: GetEstablishmentDto;
}
