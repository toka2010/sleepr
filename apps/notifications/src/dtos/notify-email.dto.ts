import { IsEmail, IsNumber, IsString } from 'class-validator';

export class NotifyEmailDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsNumber()
  amount:number;
}
