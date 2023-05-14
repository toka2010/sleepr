import { IsNumber, IsString } from 'class-validator';

export class CardDto {
  @IsString()
  cvc: string;

  @IsNumber()
  exp_year: number;

  @IsNumber()
  exp_month: number;

  @IsString()
  number: string;
}
