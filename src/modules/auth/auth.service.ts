import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from 'src/modules/auth/dto/signin.dto';
import { AuthResponse } from 'src/modules/auth/interfaces/auth-response.interface';
import { TokenPayload } from 'src/modules/auth/token/interfaces/token-payload.interface';
import { compareHash } from 'src/modules/auth/utils/auth.utils';
import { UserService } from 'src/modules/user/user.service';
import { isDefined } from 'src/utils/isDefined';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<AuthResponse> {
    const { email, password } = signInDto;

    let user = await this.usersService.findOne({ email });

    if (!isDefined(user)) user = await this.usersService.create(signInDto);

    if (!(await compareHash(password, user.passwordHash))) {
      throw new UnauthorizedException();
    }

    const payload: TokenPayload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
