import { NestFactory } from '@nestjs/core';
import { ReservationModule } from './reservation.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ReservationModule);
  app.connectMicroservice({transport:Transport.TCP})
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({whitelist:true}))
  app.useLogger(app.get(Logger))
  await app.listen(3000);
}
bootstrap();
