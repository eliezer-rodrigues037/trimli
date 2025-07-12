import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { TokenPayload } from 'src/modules/auth/token/interfaces/token-payload.interface';
import { TrimliConfigService } from 'src/modules/trimli-config/trimli-config.service';
import { User } from 'src/modules/user/entities/user.entity';
import { isDefined } from 'src/utils/isDefined';
import { Repository } from 'typeorm';

@Injectable()
export class AccessTokenService {
  constructor(
    private jwtService: JwtService,
    private trimliConfigService: TrimliConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validateTokenByRequest(request: Request): Promise<{ user: User }> {
    const token = this.extractTokenFromAuthHeader(
      request.headers.authorization,
    );

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync<TokenPayload>(token, {
        secret: this.trimliConfigService.get('APP_SECRET'),
      });

      const user = await this.userRepository.findOneBy({
        id: payload.sub,
      });

      if (!isDefined(user)) {
        throw new UnauthorizedException();
      }

      return { user };
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromAuthHeader(authHeader?: string): string | undefined {
    const [type, token] = authHeader?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
