import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetVideosDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'Search key',
  })
  search?: string;

  @IsNumberString()
  @ApiProperty({
    type: Number,
    description: 'Page',
  })
  page!: number;

  @IsNumberString()
  @ApiProperty({
    type: Number,
    description: 'Count',
  })
  count!: number;
}
