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
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import { Public } from 'src/decorators/public.decorator';
import { TransformResponse } from 'src/decorators/transform-response.decorator';
import { Link } from 'src/modules/link/entities/link.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { LinkService } from './link.service';

@Controller('link')
@ApiTags('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  @Public()
  @HttpCode(201)
  @ApiBody({ type: CreateLinkDto })
  @ApiResponse({
    status: 201,
    description: 'The link has been successfully created.',
  })
  @ApiBearerAuth()
  @TransformResponse(Link)
  async create(@Body() createLinkDto: CreateLinkDto, @AuthUser() user?: User) {
    return await this.linkService.create({ createLinkDto, userId: user?.id });
  }

  @Get()
  @ApiBearerAuth()
  async findAll(@AuthUser() user: User) {
    return await this.linkService.findAll({
      userId: user?.id,
    });
  }

  @Get(':shortCode')
  @ApiBearerAuth()
  @ApiResponse({ status: 404, description: 'Link not found' })
  async findOne(@Param('shortCode') shortCode: string, @AuthUser() user: User) {
    const link = await this.linkService.findOne({
      shortCode,
      userId: user.id,
    });

    if (!link) throw new NotFoundException('Link not found');

    return link;
  }

  @Patch(':shortCode')
  @ApiResponse({
    status: 200,
    description: 'The link has been successfully updated.',
    type: Link,
  })
  @ApiResponse({ status: 404, description: 'Link not found' })
  @ApiBody({ type: UpdateLinkDto })
  @ApiBearerAuth()
  async update(
    @Param('shortCode') shortCode: string,
    @Body() updateLinkDto: UpdateLinkDto,
    @AuthUser() user: User,
  ) {
    return await this.linkService.update({
      shortCode,
      updateLinkDto,
      userId: user.id,
    });
  }

  @Delete(':shortCode')
  @ApiBearerAuth()
  async remove(@Param('shortCode') shortCode: string, @AuthUser() user: User) {
    return await this.linkService.remove({ shortCode, userId: user.id });
  }
}
