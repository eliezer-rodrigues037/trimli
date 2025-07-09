import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MAX_CODE_GENERATION__ATTEMPTS } from 'src/modules/link/constants/max-code-generation-attempts';
import { Link } from 'src/modules/link/entities/link.entity';
import { generateLinkShortCode } from 'src/modules/link/utils/generate-link-short-code.util';
import { isDefined } from 'src/utils/isDefined';
import { Repository } from 'typeorm';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private linkRepository: Repository<Link>,
  ) {}

  async create(payload: CreateLinkDto) {
    const shortCode = await this.generateShortCode();

    const link = this.linkRepository.create({
      ...payload,
      shortCode,
    });

    return link;
  }

  async findAll() {
    const links = await this.linkRepository.find();

    return links;
  }

  async findOne(id: string) {
    const link = await this.linkRepository.findOne({
      where: { shortCode: id },
    });

    return link;
  }

  async update({
    id,
    updateLinkDto,
  }: {
    id: string;
    updateLinkDto: UpdateLinkDto;
  }) {
    const link = await this.linkRepository.findOne({
      where: [{ shortCode: id }],
    });

    if (!isDefined(link)) throw new BadRequestException('Link not found');

    const updatedLink = await this.linkRepository.save({
      ...link,
      ...updateLinkDto,
    });

    return updatedLink;
  }

  async remove(id: string) {
    const link = await this.linkRepository.findOne({
      where: { shortCode: id },
    });

    if (!isDefined(link)) throw new BadRequestException('Link not found');

    await this.linkRepository.softRemove(link);

    return `This action removes a #${id} link`;
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
}
