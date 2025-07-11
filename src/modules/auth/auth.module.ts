import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/guards/auth.guard';
import { TokenModule } from 'src/modules/auth/token/token.module';
import { TrimliConfigService } from 'src/modules/trimli-config/trimli-config.service';
import { UserModule } from 'src/modules/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (trimliConfigService: TrimliConfigService) => {
        return {
          global: true,
          secret: trimliConfigService.get('APP_SECRET'),
          signOptions: {
            expiresIn: trimliConfigService.get('ACCESS_TOKEN_EXPIRES_IN'),
          },
        };
      },
      inject: [TrimliConfigService],
    }),
    TokenModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
