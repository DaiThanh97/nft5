import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class ShareVideoDto {
  @IsUrl({}, { each: true })
  @ApiProperty({
    type: [String],
    description: 'Array must contains 1-10 urls',
  })
  urls!: string[];
}
