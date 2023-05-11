import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { DataBaseModule, LoggerModule } from '@app/common';
import { ReservationRepo } from './repos/reservation.repo';
import { ReservationSchema } from './schemas/reservation.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVIE } from '@app/common/constants/services';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    DataBaseModule,
    DataBaseModule.forFeature([
      {
        name: 'reservations',
        schema: ReservationSchema,
      },
    ]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal:true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION:Joi.number().required(),
        HTTP_HOST:Joi.string().required(),
        HTTP_PORT:Joi.number().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVIE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host:'auth',
            port: 3003
          },
        }),
        inject:[ConfigService]
      },
    ]),
  ],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationRepo],
})
export class ReservationModule {}
