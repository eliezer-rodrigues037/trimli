import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateLinkDto {
  @ApiProperty({
    description: 'The url to be shortened',
    example: 'https://example.com',
  })
  @IsUrl()
  @IsNotEmpty()
  sourceURl: string;
}
