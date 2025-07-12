import { Controller, Get, HttpCode, Param, Res } from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Public } from 'src/decorators/public.decorator';
import { RedirectService } from './redirect.service';

@Controller('')
@ApiTags('redirect')
export class RedirectController {
  constructor(private readonly redirectService: RedirectService) {}

  @Get(':shortCode')
  @HttpCode(302)
  @ApiOperation({
    summary: 'Redirect to original URL',
    description: `Redirect to the original URL based on the shortCode.
      NOTE: When testing in Swagger UI, you'll see the Location header but the browser won't follow the redirect.`,
  })
  @ApiResponse({
    status: 302,
    description: 'Redirect to the original URL',
    headers: {
      Location: {
        description: 'The original URL to redirect to',
        schema: { type: 'string', example: 'https://example.com' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Link not found' })
  @Public()
  async redirect(@Param('shortCode') shortCode: string, @Res() res: Response) {
    const sourceUrl = await this.redirectService.getSourceUrl({ shortCode });

    return res.redirect(302, sourceUrl);
  }
}
