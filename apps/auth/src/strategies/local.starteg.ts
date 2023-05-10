import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _userService: UserService) {
    console.log("kkkk");
    
    super({ usernameField: 'email' });
    console.log("kkkk");
  }

  async validate(email: string, password: string) {
    console.log("🚀 ~ file: local.starteg.ts:13 ~ LocalStrategy ~ veriy ~ email:", email)
    
    return await this._userService.verify(email, password);
  }
}