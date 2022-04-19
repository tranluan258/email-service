import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import MailFactory from './pattern/mailFactory';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [MailService, MailFactory],
  controllers: [MailController],
})
export class MailModule {}
