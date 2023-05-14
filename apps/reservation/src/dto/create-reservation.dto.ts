import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateChargeDto } from '@app/common/dto/create-charge.dto';

export class CreateReservationDto {
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsString()
  name: string;

  @IsString()
  userId: string;

  @IsNotEmptyObject()
  @Type(() => CreateChargeDto)
  @ValidateNested()
 charge:CreateChargeDto;
}
