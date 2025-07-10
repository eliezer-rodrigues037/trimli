import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from 'src/modules/link/entities/link.entity';
import { TrimliConfigService } from 'src/modules/trimli-config/trimli-config.service';
import { isDefined } from 'src/utils/isDefined';
import { Repository } from 'typeorm';

@Injectable()
export class RedirectService {
  constructor(
    private trimliConfigService: TrimliConfigService,
    @InjectRepository(Link)
    private linkRepository: Repository<Link>,
  ) {}

  async getSourceUrl({ shortCode }: { shortCode: string }) {
    const link = await this.linkRepository.findOne({
      where: { shortCode },
    });

    if (!isDefined(link)) throw new NotFoundException('Link not found');

    await this.computeLinkClick(link);

    return link.sourceURl;
  }

  async computeLinkClick(link: Link) {
    await this.linkRepository.save({
      ...link,
      clickCount: link.clickCount + 1,
    });
  }

  buildRedirectUrl(link: Link) {
    const serverUrl = this.trimliConfigService.get('SERVER_URL');

    return `${serverUrl}/${link.shortCode}`;
  }
}
