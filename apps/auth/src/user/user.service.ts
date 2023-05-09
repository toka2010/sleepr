import { Injectable } from '@nestjs/common';
import { UserRepo } from './repos/user.repo';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly _userRepo: UserRepo) {}

  async create(body: CreateUserDto) {
    const user = await this._userRepo.create({
      ...body,
      password: await bcrypt(body.password),
    });
    return user;
  }

  async verify(email: string, password: string) {
    const user = await this._userRepo.findOne({ email: email });
    const hashPassword = await bcrypt(password);
    
    return user;
  }
}
