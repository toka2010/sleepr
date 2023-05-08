import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { DataBaseModule, LoggerModule } from '@app/common';
import { ReservationRepo } from './repos/reservation.repo';
import { ReservationSchema } from './schemas/reservation.entity';

@Module({
  imports: [
    DataBaseModule,
    DataBaseModule.forFeature([{
      name: 'reservations',
      schema: ReservationSchema,
    }]),
    LoggerModule
  ],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationRepo],
})
export class ReservationModule {}
