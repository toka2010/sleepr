import { CreateChargeDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
 
  constructor(private readonly _configService: ConfigService) {}
  private readonly sripe = new Stripe(
    this._configService.get<string>('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2022-11-15',
    },
  );

  async createCharge({ card, amount }: CreateChargeDto) {
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

    return payment_intents;
  }
}
