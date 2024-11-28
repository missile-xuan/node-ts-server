import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProxyWowsModule } from './proxyWows/proxyWows.module';

@Module({
  imports: [ConfigModule.forRoot(), ProxyWowsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
