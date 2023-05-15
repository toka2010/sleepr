import Stripe from 'stripe';
import { CardDto } from './card.dto';
import { IsEmail, IsNotEmptyObject, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateChargeDto {
  @IsNotEmptyObject()
  @Type(() => CardDto)
  @ValidateNested()
  card: CardDto;

  @IsNumber()
  amount: number;

}
