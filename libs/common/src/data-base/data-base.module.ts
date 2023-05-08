import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';
import { DateSchemaDefinition } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject:[ConfigService]
    }),
  ],
})
export class DataBaseModule {
  static forFeature(models:ModelDefinition[]){
    return MongooseModule.forFeature(models);
  }
}
