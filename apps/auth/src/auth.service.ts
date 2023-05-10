import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './user/schemas/user.schema';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ITokenPayload } from './interfaces/token-payload.interface';


@Injectable()
export class AuthService {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _jwtService: JwtService,
  ) {}
  async login(user: UserDocument, res: Response) {
    console.log(
      '🚀 ~ file: auth.service.ts:15 ~ AuthService ~ login ~ user:',
      user,
    );
    const tokenPayload :ITokenPayload = {
      userId: user._id,
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this._configService.get<number>('JWT_EXPIRATION'),
    );
    const token = this._jwtService.sign(tokenPayload, {
      secret: this._configService.get<string>('JWT_SECRET'),
      expiresIn: this._configService.get<number>('JWT_EXPIRATION'),
    });

    res.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }
  async  validate(){
    console.log("sjkxjfsuyfxvsiuv");
    
  }
}
