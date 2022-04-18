// import { MessageDto } from './dtos/message.dto';
import { MailService } from './mail.service';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MailDataDto } from './dtos/mail-data.dto';
import { Type } from './enum/type.enum';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern('sendMailDoctor')
  sendMailDoctor(mailDataDto: MailDataDto) {
    console.log(mailDataDto);
    this.mailService.sendMail(mailDataDto, Type.Doctor);
  }

  @MessagePattern('sendMailPatient-1')
  sendMailPatient(mailDataDto: MailDataDto) {
    console.log(mailDataDto);
    this.mailService.sendMail(mailDataDto, Type.Patient);
  }
}
