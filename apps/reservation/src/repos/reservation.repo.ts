import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { ReservationDocument } from "../schemas/reservation.entity";

@Injectable()
export class ReservationRepo extends AbstractRepository<ReservationDocument>{
    logger: Logger;
    
    // constructor(){}
    
}