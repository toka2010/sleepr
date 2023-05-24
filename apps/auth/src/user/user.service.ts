import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserRepo } from './repos/user.repo';
import { CreateUserDto } from './dtos/create-user.dto';
const bcrypt = require('bcryptjs')
import { Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(private readonly _userRepo: UserRepo) {}

  async create(body: CreateUserDto) {
    const ll=await bcrypt.hash(body.password, 10);
    body.password=await bcrypt.hash(body.password, 10);
    console.log("🚀 ~ file: user.service.ts:18 ~ UserService ~ create ~  body.password:",  body.password)
    await this.validateBeforeCreate(body);
    const user = await this._userRepo.create({
      ...body
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
    console.log("🚀 ~ file: user.service.ts:34 ~ UserService ~ verify ~ password:", password)
    const user = await this._userRepo.findOne({ email: email });
    console.log("🚀 ~ file: user.service.ts:35 ~ UserService ~ verify ~ user:", user)
    const isMatched = bcrypt.compareSync(password, user.password);
    console.log("🚀 ~ file: user.service.ts:37 ~ UserService ~ verify ~ isMatched:", isMatched)
    if (!isMatched) {
      throw new UnauthorizedException('invalid data ');
    }

    return user;
  }
  async findUserById(userId: Types.ObjectId) {
    return await this._userRepo.findOne({ _id: userId });
  }
}
