import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserRepo } from './repos/user.repo';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { log } from 'console';
import { Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(private readonly _userRepo: UserRepo) {}

  async create(body: CreateUserDto) {
    await this.validateBeforeCreate(body);
    const user = await this._userRepo.create({
      ...body,
      password: await bcrypt.hash(body.password, 10),
    });
    return user;
  }

  async validateBeforeCreate(body: CreateUserDto) {
    const user = await this._userRepo.findOne({ email: body.email });
    if (user) {
      throw new UnprocessableEntityException('this email already exist ');
    }
  }

  async verify(email: string, password: string) {
    const user = await this._userRepo.findOne({ email: email });
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      throw new UnauthorizedException('invalid data ');
    }

    return user;
  }
  async findUserById(userId: Types.ObjectId) {
    return await this._userRepo.findOne({ _id: userId });
  }
}
