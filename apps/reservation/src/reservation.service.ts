import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepo } from './repos/reservation.repo';
import { Types } from 'mongoose';

@Injectable()
export class ReservationService {
  constructor(protected readonly _reservationRepo: ReservationRepo) {}
  async create(createReservationDto: CreateReservationDto) {
    return await this._reservationRepo.create(createReservationDto);
  }

  async findAll() {
    return await this._reservationRepo.find({});
  }

  async findOne(id: string) {
    return await this._reservationRepo.findOne({ _id: new Types.ObjectId(id) });
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    return await this._reservationRepo.findOneAndUpdate(
      {
        _id: new Types.ObjectId(id) 
      },
      updateReservationDto,
    );
  }

 async  remove(id: string) {
    return await this._reservationRepo.findOneAndDelete({_id: new Types.ObjectId(id),}
    )
  }
}
