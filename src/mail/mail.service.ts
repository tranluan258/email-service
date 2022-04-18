import { MessageDto } from './dtos/message.dto';
import { Injectable } from '@nestjs/common';
import MailFactory from './pattern/mailFactory';
import { MailDataDto } from './dtos/mail-data.dto';
import { Type } from './enum/type.enum';

@Injectable()
export class MailService {
  constructor(private readonly mailFactory: MailFactory) {}

  sendMail(mailDataDto: MailDataDto, type: Type) {
    this.mailFactory.getMailServer().sendMail(mailDataDto, type);
  }
}
