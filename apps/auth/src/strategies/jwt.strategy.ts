import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { Request } from 'express';
import { ITokenPayload } from '../interfaces/token-payload.interface';
import { log } from 'console';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _userService: UserService,
  ) {
    console.log("lalallalalal");
    
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
        console.log("🚀 ~ file: jwt.strategy.ts:27 ~ JwtStrategy ~ classJwtStrategyextendsPassportStrategy ~ request3:", request.cookies)
          
          console.log("🚀 ~ file: jwt.strategy.ts:25 ~ JwtStrategy ~ classJwtStrategyextendsPassportStrategy ~ request2:", request?.Authentication);
          console.log("🚀 ~ file: jwt.strategy.ts:26 ~ JwtStrategy ~ classJwtStrategyextendsPassportStrategy ~ request?.headers.Authentication:nanananna", request?.headers)

          return request?.cookies?.Authentication || request?.Authentication  || request?.headers.Authentication;
        },
          
      ]),
      secretOrKey: _configService.get('JWT_SECRET'),
    });
  }

  async validate({ userId }: ITokenPayload) {
    console.log(
      '🚀 ~ file: jwt.strategy.ts:25 ~ JwtStrategy ~ validate ~ userId:',
      userId,
    );

    return await this._userService.findUserById(userId);
  }
}
