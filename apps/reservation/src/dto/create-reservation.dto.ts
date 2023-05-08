import { Type } from "class-transformer";
import { IsDate, IsString } from "class-validator";

export class CreateReservationDto {
    @IsDate()
    @Type(()=>Date )
    startDate: Date;
  

    @IsString()
    name:  string;
    @IsString()
    userId: string;
}
