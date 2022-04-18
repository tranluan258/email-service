import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import MailFactory from './pattern/mailFactory';

@Module({
  providers: [MailService, MailFactory],
  controllers: [MailController],
})
export class MailModule {}
