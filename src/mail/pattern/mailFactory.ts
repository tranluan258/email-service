import IMail from './IMail';
import SendWithGmail from './sendWithGmail';
import ConstTypeEmail from './constTypeEmail';
import { Injectable } from '@nestjs/common';

const { EMAIL_SERVER_TYPE } = process.env;

@Injectable()
class MailFactory {
  public getMailServer(): IMail {
    switch (EMAIL_SERVER_TYPE) {
      case ConstTypeEmail.GMAIL:
        return SendWithGmail.getInstance();
      default:
        return SendWithGmail.getInstance();
    }
  }
}

export default MailFactory;
