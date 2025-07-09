import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from 'src/modules/link/entities/link.entity';
import { TrimliConfigService } from 'src/modules/trimli-config/trimli-config.service';
import { Repository } from 'typeorm';

@Injectable()
export class RedirectService {
  constructor(
    private trimliConfigService: TrimliConfigService,
    @InjectRepository(Link)
    linkRepository: Repository<Link>,
  ) {}

  async redirect({ shortCode }: { shortCode: string }) {
    throw new NotImplementedException();
  }
}
