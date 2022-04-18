import { Type } from '../enum/type.enum';
import { MailDataDto } from './../dtos/mail-data.dto';
interface IMail {
  sendMail(mailDataDto: MailDataDto, type: Type): void;
}

export default IMail;
