import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { LinkService } from './link.service';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  async create(@Body() createLinkDto: CreateLinkDto) {
    return await this.linkService.create(createLinkDto);
  }

  @Get()
  async findAll() {
    return await this.linkService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const link = await this.linkService.findOne(id);

    if (!link) throw new NotFoundException('Link not found');

    return link;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return await this.linkService.update({ id, updateLinkDto });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.linkService.remove(id);
  }
}
