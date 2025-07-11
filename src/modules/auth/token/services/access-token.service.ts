import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { TrimliConfigService } from 'src/modules/trimli-config/trimli-config.service';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccessTokenService {
  constructor(
    private jwtService: JwtService,
    private trimliConfigService: TrimliConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
}
