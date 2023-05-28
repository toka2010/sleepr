import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotifyEmailDto } from './dtos/notify-email.dto';
import { log } from 'console';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UsePipes(new ValidationPipe())
  @EventPattern('notify-email')
  async notifyEmail(@Payload() data: NotifyEmailDto) {
    console.log('%cnotifications.controller.ts line:14 "tokaa mohammmmmmmmmmmmm"', 'color: #007acc;', "tokaa mohammmmmmmmmmmmm");
    return await this.notificationsService.notifyEmail(data);
  }
}
