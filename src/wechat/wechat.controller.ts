import { Controller, Get, Req, Res } from '@nestjs/common';
import { WechatService } from './wechat.service';
import { Logger } from 'nestjs-pino';
import * as util from 'util';
// tslint:disable-next-line:no-var-requires
const axios = require('axios').default;

@Controller('wechat')
export class WechatController {
  constructor(
    private readonly wechatService: WechatService,
    private readonly logger: Logger,
  ) {}

  @Get('/mp-qr-ticket')
  async getMediaPlatformTempQRImageTicket(@Req() request) {
    return await this.wechatService.getMediaPlatformTempQRImageTicketResult(
      request.query.sceneId,
      request.query.expiresInSeconds,
    );
  }

  @Get('/mp-qr-url')
  async getMediaPlatformTempQRImageUrl(@Req() request) {
    const ticketResult = await this.wechatService.getMediaPlatformTempQRImageTicketResult(
      request.query.sceneId,
      request.query.expiresInSeconds,
    );

    return `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ticketResult.ticket}`;
  }

  @Get('/mp-qr-image')
  async getMediaPlatformTempQRImage(@Req() request, @Res() response) {
    const url = await this.getMediaPlatformTempQRImageUrl(request);
    const axiosResponse = await axios.get(url, { responseType: 'stream' });
    return axiosResponse.data.pipe(response);
  }
}
