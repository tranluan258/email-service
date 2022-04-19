//import { MessageDto } from './dtos/message.dto';
import { Injectable } from '@nestjs/common';
import MailFactory from './pattern/mailFactory';
import { MailDataDto } from './dtos/mail-data.dto';
import { Type } from './enum/type.enum';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class MailService {
  constructor(
    private readonly mailFactory: MailFactory,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  sendMail(mailDataDto: MailDataDto, type: Type) {
    this.mailFactory.getMailServer().sendMail(mailDataDto, type);
  }

  scheduleSendMail(mailDataDto: MailDataDto, type: Type) {
    const date = new Date(mailDataDto.dateExamination);
    //CronJob(time,funcion), function that is executed at a given time.
    const job = new CronJob(date, () => {
      this.sendMail(mailDataDto, type);
    });

    this.schedulerRegistry.addCronJob(
      `${Date.now()}-${mailDataDto.email}`,
      job,
    );
    job.start();
  }
}
