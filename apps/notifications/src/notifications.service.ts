import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dtos/notify-email.dto';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
@Injectable()
export class NotificationsService {
  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: this._configService.get('GOOGLE_USER'),
      clientId: this._configService.get('GOOGLE_CLIENTID'),
      refreshToken: this._configService.get('GOOGLE_REFRESH_TOKEN'),
      clientSecret: this._configService.get('GOOGLE_CLIENT_SECRET'),
    },
  });
  constructor(private readonly _configService: ConfigService) {}
  async notifyEmail({ email ,amount }: NotifyEmailDto) {
    console.log(
      '🚀 ~ file: notifications.service.ts:8 ~ NotificationsService ~ notifyEmail ~ email:',
      email,this._configService.get('GOOGLE_USER'),this._configService.get('GOOGLE_CLIENTID'),
    );

    await this.transporter.sendMail({
      to: 'toka.fawy@gmail.com',
      subject: 'hello from sleepr',
      text:`your payments of ${amount} $, are completed successfully`,
      from:this._configService.get('GOOGLE_USER'),
    });
    console.log('%cnotifications.service.ts line:30 we got it ', 'color: #007acc;', "we got it" );
  }
}
 