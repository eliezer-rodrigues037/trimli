import { Controller, Get, Param, Res } from '@nestjs/common';

import { Response } from 'express';
import { RedirectService } from './redirect.service';

@Controller('')
export class RedirectController {
  constructor(private readonly redirectService: RedirectService) {}

  @Get(':shortCode')
  async redirect(@Param('shortCode') shortCode: string, @Res() res: Response) {
    const sourceUrl = await this.redirectService.getSourceUrl({ shortCode });

    return res.redirect(302, sourceUrl);
  }
}
