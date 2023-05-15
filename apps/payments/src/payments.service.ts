import { CreateChargeDto, NOTIFICATIONS_SERVICE, PaymentCreateChargeDto } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly _configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE) private readonly _clientProxy: ClientProxy,
  ) {}
  private readonly sripe = new Stripe(
    this._configService.get<string>('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2022-11-15',
    },
  );

  async createCharge({ card, amount ,email}: PaymentCreateChargeDto) {
    console.log(
      '🚀 ~ file: payments.service.ts:17 ~ PaymentsService ~ createCharge ~ amount:',
      amount,
    );
    console.log(
      '🚀 ~ file: payments.service.ts:17 ~ PaymentsService ~ createCharge ~ card:',
      card,
    );
    const paymentMethod = await this.sripe.paymentMethods.create({
      type: 'card',
      card,
    });
    console.log(
      '🚀 ~ file: payments.service.ts:29 ~ PaymentsService ~ createCharge ~ paymentMethod:',
      paymentMethod,
    );
    const payment_intents = await this.sripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount * 100,
      payment_method_types: ['card'],
      confirm: true,
      currency: 'usd',
    });

    await this._clientProxy.emit('notify-email', {email,amount});
    return payment_intents;
  }
}
