import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { UserDocument } from "../schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserRepo extends AbstractRepository<UserDocument>{
    logger: Logger;
    constructor(@InjectModel('users') private _usersModel:Model<UserDocument>){
        super(_usersModel);
    }
}