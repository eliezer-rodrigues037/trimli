import { Controller, Get, HttpCode, Param, Res } from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { RedirectService } from './redirect.service';

@Controller('')
@ApiTags('redirect')
export class RedirectController {
  constructor(private readonly redirectService: RedirectService) {}

  @Get(':shortCode')
  @HttpCode(302)
  @ApiOperation({
    summary: 'Redirect to original URL',
    description: 'Redirect to the original URL based on the shortCode',
  })
  @ApiResponse({ status: 404, description: 'Link not found' })
  async redirect(@Param('shortCode') shortCode: string, @Res() res: Response) {
    const sourceUrl = await this.redirectService.getSourceUrl({ shortCode });

    return res.redirect(302, sourceUrl);
  }
}
