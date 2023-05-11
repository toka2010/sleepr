import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NestMicroservice, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.connectMicroservice({transport:Transport.TCP ,
  options:{
    host:'0.0.0.0',
    port:3003
  } })
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({whitelist:true}))
  app.useLogger(app.get(Logger))
  await app.startAllMicroservices()
  await app.listen(3001);
}
bootstrap();
