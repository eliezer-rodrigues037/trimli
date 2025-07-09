import { Controller, Get, Param } from '@nestjs/common';

import { RedirectService } from './redirect.service';

@Controller('')
export class RedirectController {
  constructor(private readonly redirectService: RedirectService) {}

  @Get(':shortCode')
  async redirect(@Param('shortCode') shortCode: string) {
    return await this.redirectService.redirect({ shortCode });
  }
}
