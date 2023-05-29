import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepo } from './repos/reservation.repo';
import { Types } from 'mongoose';
import { PAYMENTS_SERVICE, UserDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationService {
  constructor(
    protected readonly _reservationRepo: ReservationRepo,
    @Inject(PAYMENTS_SERVICE) private readonly _clientProxy: ClientProxy,
  ) {}
  async create(
    createReservationDto: CreateReservationDto,
    { email, _id: userId }: UserDto,
  ) {
    console.log(
      '🚀 ~ file: reservation.service.ts:17 ~ ReservationService ~ create ~ email:userId',
      email ,userId
    );
    return this._clientProxy
      .send('create-charge', { ...createReservationDto.charge, email })
      .pipe(
        map((res) => {
          return this._reservationRepo.create({
            ...createReservationDto,
            paymentId: res.id,
            userId,
          });
        }),
      );
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
        _id: new Types.ObjectId(id),
      },
      updateReservationDto,
    );
  }

  async remove(id: string) {
    console.log('%creservation.service.ts line:55 "delete......"', 'color: #007acc;', "delete......");
    return await this._reservationRepo.findOneAndDelete({
      _id: new Types.ObjectId(id),
    });
  }
}
