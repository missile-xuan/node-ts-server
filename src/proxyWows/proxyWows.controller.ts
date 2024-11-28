import { Controller, Get, Header, Options, Post, Request } from '@nestjs/common';
import { ProxyWowsService } from './proxyWows.service';

@Controller('proxyWows')
export class ProxyWowsController {
  constructor(private proxyWowsService: ProxyWowsService) {}

  @Get('getProxyWowsData')
  @Header('Cache-Control', 'no-store')
  @Header('Access-Control-Allow-Origin', '*')
  findAll(): any {
    return this.proxyWowsService.getProxyWowsData();
  }

  @Get('*')
  // @Header('Access-Control-Allow-Origin', '*')
  proxyGet(@Request() req): Promise<any> {
    return this.proxyWowsService.proxyGet(req.url);
  }

  @Post('*')
  // @Header('Access-Control-Allow-Origin', '*')
  proxyPost(@Request() req): Promise<any> {
    return this.proxyWowsService.proxyPost(req);
  }

  @Options('*')
  options() {
    return;
  }
}
