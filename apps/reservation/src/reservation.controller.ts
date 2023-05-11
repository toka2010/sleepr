import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { JwtAuthGuard, UserDto, currentUser } from '@app/common';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(@Body() createReservationDto: CreateReservationDto) {
    return await this.reservationService.create(createReservationDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@currentUser() user: UserDto) {
    console.log(
      '🚀 ~ file: reservation.controller.ts:21 ~ ReservationController ~ findAll ~ user:',
      user,
    );
    return await this.reservationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.reservationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationService.update(id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(id);
  }
}
