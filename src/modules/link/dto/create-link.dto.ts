import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUrl, IsUUID } from 'class-validator';

export class CreateLinkDto {
  @ApiProperty({
    description: 'The url to be shortened',
    example: 'https://example.com',
  })
  @IsUrl()
  @IsNotEmpty()
  sourceURl: string;

  @ApiProperty({
    required: false,
  })
  @IsUUID('4')
  @IsOptional()
  userId: string;
}
