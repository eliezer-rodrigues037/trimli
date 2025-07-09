import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateLinkDto {
  @IsUrl()
  @IsNotEmpty()
  sourceURl: string;
}
