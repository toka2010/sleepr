import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { DataBaseModule } from './data-base/data-base.module';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  providers: [CommonService],
  exports: [CommonService],
  imports: [DataBaseModule, ConfigModule, LoggerModule],
})
export class CommonModule {}
