import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { DataBaseModule } from '@app/common';

@Module({
  imports:[DataBaseModule],
  controllers: [ReservationController],
  providers: [ReservationService]
})
export class ReservationModule {}
