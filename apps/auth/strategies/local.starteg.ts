import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UserService } from '../src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _userService: UserService) {
    super({ userNameField: 'email' });
  }

  async veriy(email: string, password: string) {
    return await this._userService.verify(email, password);
  }
}
