import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import {
  Reservation,
  ReservationDocument,
} from '../schemas/reservation.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReservationRepo extends AbstractRepository<ReservationDocument> {
  logger: Logger;

  constructor(
    @InjectModel('reservations') private _reservationModel: Model<ReservationDocument>,
  ) {
    super(_reservationModel);
  }
}
