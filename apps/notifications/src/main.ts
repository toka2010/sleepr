import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger, LoggerModule } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  const configService = await app.get(ConfigService);
  const tsp_port = await configService.get<number>('TCP_PORT');
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: tsp_port,
    },
  });
  app.useLogger(app.get(Logger))
 await app.startAllMicroservices();
  // await app.listen(3000);
}
bootstrap();
