import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from 'src/modules/auth/auth.service';
import { SignInDto } from 'src/modules/auth/dto/signin.dto';
import { AuthResponse } from 'src/modules/auth/interfaces/auth-response.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Authenticate user and return JWT token' })
  @ApiBody({
    description: 'User credentials',
    type: SignInDto,
    examples: {
      example: {
        value: {
          email: 'bob@dev.com',
          password: 'Bobdev2025',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Successful authentication',
    type: AuthResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  async signIn(@Body() signInDto: SignInDto) {
    const result = await this.authService.signIn(signInDto);

    return result;
  }
}
