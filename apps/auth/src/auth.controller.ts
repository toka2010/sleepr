import { Controller, Get, Post, Res, UseGuards ,Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { currentUser } from './decorators/current-user.decprator';
import { User, UserDocument } from './user/schemas/user.schema';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Request() req,
    @currentUser() user: UserDocument,
    @Res({ passthrough: true }) res: Response,
  ) {
   
    await this.authService.login(user, res);
    res.send(user);


  }
}
