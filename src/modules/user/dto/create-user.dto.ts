import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword(
    {
      minLength: 6,
      minNumbers: 1,
      minSymbols: 0,
      minLowercase: 1,
      minUppercase: 0,
    },
    {
      message:
        'Password should contain at least 6 caracteres, one number and one letter.',
    },
  )
  @IsNotEmpty()
  password: string;
}
