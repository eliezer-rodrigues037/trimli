import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MAX_CODE_GENERATION__ATTEMPTS } from 'src/modules/link/constants/max-code-generation-attempts';
import { Link } from 'src/modules/link/entities/link.entity';
import { generateLinkShortCode } from 'src/modules/link/utils/generate-link-short-code.util';
import { RedirectService } from 'src/modules/redirect/redirect.service';
import { isDefined } from 'src/utils/isDefined';
import { Repository } from 'typeorm';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';

@Injectable()
export class LinkService {
  constructor(
    private redirectService: RedirectService,
    @InjectRepository(Link)
    private linkRepository: Repository<Link>,
  ) {}

  async create(createLinkDto: CreateLinkDto): Promise<Link> {
    const shortCode = await this.generateShortCode();

    const link = await this.linkRepository.save({
      ...createLinkDto,
      shortCode,
    });

    return {
      ...link,
      redirectUrl: this.redirectService.buildRedirectUrl(link),
    };
  }

  async findAll(): Promise<Link[]> {
    const links = await this.linkRepository.find();

    return links.map((link) => ({
      ...link,
      redirectUrl: this.getRedirectUrl(link),
    }));
  }

  async findOne(id: string): Promise<Link | null> {
    const link = await this.linkRepository.findOne({
      where: { shortCode: id },
    });

    return link ? { ...link, redirectUrl: this.getRedirectUrl(link) } : null;
  }

  async update({
    shortCode,
    updateLinkDto,
  }: {
    shortCode: string;
    updateLinkDto: UpdateLinkDto;
  }): Promise<Link> {
    const link = await this.linkRepository.findOne({
      where: [{ shortCode: shortCode }],
    });

    if (!isDefined(link)) throw new BadRequestException('Link not found');

    const updatedLink = await this.linkRepository.save({
      ...link,
      ...updateLinkDto,
    });

    return updatedLink;
  }

  async remove(shortCode: string) {
    const link = await this.linkRepository.findOne({
      where: { shortCode },
    });

    if (!isDefined(link)) throw new BadRequestException('Link not found');

    await this.linkRepository.softRemove(link);
  }

  async generateShortCode(): Promise<string> {
    let attempts = 0;
    let shortCode: string;
    do {
      shortCode = generateLinkShortCode(6);

      const exists = await this.linkRepository.findOne({
        where: { shortCode },
      });
      if (!exists) return shortCode;
      attempts++;
    } while (attempts < MAX_CODE_GENERATION__ATTEMPTS);

    throw new UnprocessableEntityException('Failed to generate a unique code');
  }

  getRedirectUrl(link: Link): string {
    return this.redirectService.buildRedirectUrl(link);
  }
}
