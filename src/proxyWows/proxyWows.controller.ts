
import { Controller, Get, Header, Request } from '@nestjs/common';
import { ProxyWowsService } from './proxyWows.service';

@Controller('proxyWows')
export class ProxyWowsController {
  constructor(private proxyWowsService: ProxyWowsService) {}

  @Get('getProxyWowsData')
  @Header('Cache-Control', 'no-store')
  findAll(@Request() req: any): any {
    return this.proxyWowsService.getProxyWowsData();
  }

  @Get('*')
  @Header('Cache-Control', 'no-store')
  proxyGet(@Request() req: any): Promise<any> {
    return this.proxyWowsService.proxyGet(req.url);
  }
}
