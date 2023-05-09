import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGard } from '../guards/local.guard';
import { currentUser } from '../decorators/current-user.decprator';
import { User } from './user/schemas/user.schema';
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalGard)
  @Post('login')
  async login(
    @currentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.login(user, res);
    res.send(user);
  }
}
