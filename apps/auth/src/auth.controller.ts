import { Controller, Get, Post, Res, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { User, UserDocument } from './user/schemas/user.schema';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtGuard } from './guards/jwt.guard';
import { currentUser } from '@app/common';

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
    const jwt=await this.authService.login(user, res);
    console.log("🚀 ~ file: auth.controller.ts:22 ~ AuthController ~ jwt:", jwt)
    res.send(jwt);
  }

  @UseGuards(JwtGuard)
  @MessagePattern('authintecate')
  async authenticate(@Payload() data: any) {
    
    return  data.user;
      
  }
  @Get()
  async sayHello(){
    return 'hello';
  } 
}
