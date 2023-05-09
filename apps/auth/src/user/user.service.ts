import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepo } from './repos/user.repo';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly _userRepo: UserRepo) {}

  async create(body: CreateUserDto) {
    const user = await this._userRepo.create({
      ...body,
      password: await bcrypt.hash(body.password ,10),
    });
    return user;
  }

  async verify(email: string, password: string) {
    const user = await this._userRepo.findOne({ email: email });
    const isMatched = await bcrypt.compare(password ,user.password )
    if(! isMatched){
      throw new UnauthorizedException('invalid data ')
    }
    
    return user;
  }
}
