import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { DataBaseModule } from './data-base/data-base.module';
import { ConfigModule } from './config/config.module';

@Module({
  providers: [CommonService],
  exports: [CommonService],
  imports: [DataBaseModule, ConfigModule],
})
export class CommonModule {}
