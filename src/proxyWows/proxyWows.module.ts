
import { Module } from '@nestjs/common';
import { ProxyWowsController } from './proxyWows.controller';
import { ProxyWowsService } from './proxyWows.service';

@Module({
  controllers: [ProxyWowsController],
  providers: [ProxyWowsService],
})
export class ProxyWowsModule {}
