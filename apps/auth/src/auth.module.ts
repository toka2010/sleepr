import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from './user/user.module';
import { LoggerModule } from '@app/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as  Joi from 'joi';
import { UserService } from './user/user.service';
import { LocalStrategy } from './strategies/local.starteg';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthGuard,  } from './guards/local.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
@Module({
  imports: [
    UserModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal:true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION:Joi.number().required(),
      }),
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
        },
      }),
      inject:[ConfigService]
    }),
    PassportModule
  ],
  controllers: [AuthController,],
  providers: [LocalStrategy ,AuthService ,LocalAuthGuard ,JwtStrategy],
})
export class AuthModule {}
