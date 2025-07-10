import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformResponse } from 'src/decorators/transform-response.decorator';
import { Link } from 'src/modules/link/entities/link.entity';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { LinkService } from './link.service';

@Controller('link')
@ApiTags('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  @HttpCode(201)
  @ApiBody({ type: CreateLinkDto })
  @ApiResponse({
    status: 201,
    description: 'The link has been successfully created.',
  })
  @TransformResponse(Link)
  async create(@Body() createLinkDto: CreateLinkDto) {
    return await this.linkService.create(createLinkDto);
  }

  // TODO: Protect this endpoint with authentication
  @Get()
  async findAll() {
    return await this.linkService.findAll();
  }

  // TODO: Protect this endpoint with authentication
  @Get(':shortCode')
  @ApiResponse({ status: 404, description: 'Link not found' })
  async findOne(@Param('shortCode') shortCode: string) {
    const link = await this.linkService.findOne(shortCode);

    if (!link) throw new NotFoundException('Link not found');

    return link;
  }

  // TODO: Protect this endpoint with authentication
  @Patch(':shortCode')
  @ApiResponse({
    status: 200,
    description: 'The link has been successfully updated.',
    type: Link,
  })
  @ApiResponse({ status: 404, description: 'Link not found' })
  @ApiBody({ type: UpdateLinkDto })
  async update(
    @Param('shortCode') shortCode: string,
    @Body() updateLinkDto: UpdateLinkDto,
  ) {
    return await this.linkService.update({
      shortCode,
      updateLinkDto,
    });
  }

  // TODO: Protect this endpoint with authentication
  @Delete(':shortCode')
  async remove(@Param('shortCode') shortCode: string) {
    return await this.linkService.remove(shortCode);
  }
}
