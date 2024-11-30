import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProxyWowsController } from './proxyWows.controller';
import { ProxyWowsService } from './proxyWows.service';
import { SetHeaderMiddleware } from './proxyWows.middleware';

@Module({
  controllers: [ProxyWowsController],
  providers: [ProxyWowsService],
})
export class ProxyWowsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SetHeaderMiddleware).forRoutes('*');
  }
}
