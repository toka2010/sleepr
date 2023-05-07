import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { DataBaseModule } from '@app/common';
import { ReservationRepo } from './repos/reservation.repo';

@Module({
  imports:[DataBaseModule],
  controllers: [ReservationController],
  providers: [ReservationService , ReservationRepo]
})
export class ReservationModule {}
