import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessTokenService } from 'src/modules/auth/token/services/access-token.service';
import { User } from 'src/modules/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule],
  providers: [AccessTokenService],
  exports: [AccessTokenService],
})
export class TokenModule {}
