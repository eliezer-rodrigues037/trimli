import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from 'src/modules/link/entities/link.entity';
import { RedirectModule } from 'src/modules/redirect/redirect.module';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';

@Module({
  imports: [TypeOrmModule.forFeature([Link]), RedirectModule],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
