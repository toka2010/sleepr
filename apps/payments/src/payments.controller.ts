import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateChargeDto } from '@app/common';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create-charge')
@UsePipes(new ValidationPipe())
  async charge(@Payload() body: CreateChargeDto) {
    console.log(
      '🚀 ~ file: payments.controller.ts:13 ~ PaymentsController ~ charge ~ body:',
      body,
    );
    return this.paymentsService.createCharge(body);
  }
}
