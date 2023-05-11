import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { currentUser } from '../decorators/current-user.decprator';
import { UserDocument } from './schemas/user.schema';
import { JwtGuard } from '../guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}
  @Post()
  async create(@Body() body: CreateUserDto) {
    return await this._userService.create(body);
  }

  @Get()
  @UseGuards(JwtGuard)
  async findUser(@currentUser() user: UserDocument) {
    return  user;
    
  }
  
}
