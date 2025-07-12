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

  async create({
    createLinkDto,
    userId,
  }: {
    createLinkDto: CreateLinkDto;
    userId?: string;
  }): Promise<Link> {
    const shortCode = await this.generateShortCode();

    const link = await this.linkRepository.save({
      ...createLinkDto,
      shortCode,
      userId: userId,
    });

    return {
      ...link,
      redirectUrl: this.redirectService.buildRedirectUrl(link),
    };
  }

  async findAll({ userId }: { userId: string }): Promise<Link[]> {
    const links = await this.linkRepository.find({
      where: {
        userId,
      },
    });

    return links.map((link) => ({
      ...link,
      redirectUrl: this.getRedirectUrl(link),
    }));
  }

  async findOne({
    shortCode,
    userId,
  }: {
    shortCode: string;
    userId: string;
  }): Promise<Link | null> {
    const link = await this.linkRepository.findOne({
      where: { shortCode, userId },
    });

    return link ? { ...link, redirectUrl: this.getRedirectUrl(link) } : null;
  }

  async update({
    shortCode,
    updateLinkDto,
    userId,
  }: {
    userId: string;
    shortCode: string;
    updateLinkDto: UpdateLinkDto;
  }): Promise<Link> {
    const link = await this.linkRepository.findOne({
      where: [{ shortCode: shortCode, userId }],
    });

    if (!isDefined(link)) throw new BadRequestException('Link not found');

    const updatedLink = await this.linkRepository.save({
      ...link,
      ...updateLinkDto,
    });

    return updatedLink;
  }

  async remove({ shortCode, userId }: { shortCode: string; userId: string }) {
    const link = await this.linkRepository.findOne({
      where: { shortCode, userId },
    });

    if (!isDefined(link)) throw new BadRequestException('Link not found');

    await this.linkRepository.softRemove(link);
  }

  protected async generateShortCode(): Promise<string> {
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

  protected getRedirectUrl(link: Link): string {
    return this.redirectService.buildRedirectUrl(link);
  }
}
