import { MessageDto } from './../dtos/message.dto';
import IMail from './IMail';
import * as ejs from 'ejs';
import 'dotenv/config';
import * as nodemailer from 'nodemailer';
import { MailDataDto } from '../dtos/mail-data.dto';
import { Type } from '../enum/type.enum';

const { GMAIL_HOST, GMAIL_PASSWORD } = process.env;
type transporter = nodemailer.Transporter;

class SendWithGmail implements IMail {
  private static instance: SendWithGmail;
  private transporter: transporter;
  private constructor(transporter: transporter) {
    this.transporter = transporter;
  }

  public static getInstance(): SendWithGmail {
    if (!SendWithGmail.instance) {
      const transporter: transporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        secure: true,
        auth: {
          user: GMAIL_HOST,
          pass: GMAIL_PASSWORD,
        },
      });

      SendWithGmail.instance = new SendWithGmail(transporter);
    }

    return SendWithGmail.instance;
  }

  public async sendMail(mailDataDto: MailDataDto, type: Type): Promise<any> {
    // const attachmentsSend: { filename: string; content: Buffer }[] = [];

    // if (attachments != null) {
    //   attachments.forEach((element) => {
    //     const fileContents = Buffer.from(element.content, 'base64');
    //     attachmentsSend.push({
    //       filename: element.filename,
    //       content: fileContents,
    //     });
    //   });
    // }

    let content = '';
    if (type == Type.Doctor) {
      content = await ejs.renderFile(
        './src/mail/emailTemplate/doctor.template.ejs',
        {
          name: mailDataDto.name,
          dateExamination: mailDataDto.dateExamination,
          hours: mailDataDto.hours,
        },
      );
    } else {
      content = await ejs.renderFile(
        './src/mail/emailTemplate/patient.template.ejs',
        {
          name: mailDataDto.name,
          dateExamination: mailDataDto.dateExamination,
          hours: mailDataDto.hours,
        },
      );
    }

    const mailOptions = {
      from: 'Admin',
      to: mailDataDto.email,
      subject: 'Send Email',
      html: content,
      // attachments: attachmentsSend,
    };

    this.transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      }
    });
  }
}

export default SendWithGmail;
