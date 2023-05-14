import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const configService = await app.get(ConfigService);
  const port = await configService.get<number>('PORT');
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { host: '0.0.0.0', port: 3005 },
  });
  app.startAllMicroservices()
  app.useLogger(app.get(Logger));
  // await app.listen(port);
}
bootstrap();
