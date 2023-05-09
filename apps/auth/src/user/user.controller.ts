import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}
  @Post()
  async create(@Body() body: CreateUserDto) {
    return await this._userService.create(body); 
  }
}
  