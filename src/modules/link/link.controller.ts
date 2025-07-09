import {
  Body,
  Controller,
  Delete,
  Get,
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
  create(@Body() createLinkDto: CreateLinkDto) {
    return this.linkService.create(createLinkDto);
  }

  @Get()
  findAll() {
    return this.linkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.linkService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linkService.update({ id, updateLinkDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linkService.remove(id);
  }
}
