import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './user/schemas/user.schema';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor( private readonly _configService:ConfigService,
    private  readonly  _jwtService:JwtService,

    ){}
  async login(user: UserDocument, res: Response) {
   const tokenPayload={
    userId  : user._id
   }

  }
}
