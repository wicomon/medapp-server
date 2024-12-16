import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { EmailAdapter, emailSender } from '../interfaces/mail';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService implements EmailAdapter {
  constructor(private readonly configService: ConfigService) {}

  async sendEmail({
    template,
    emailTitle,
    emailReciever,
    emailSubject,
    withCopy = [],
    withHiddenCopy = [],
    attachments = [],
  }: emailSender) {
    const awsMail = this.configService.get<string>('AWS_MAIL_SMTP');
    const awsUser = this.configService.get<string>('AWS_MAIL_USER');
    const awsPass = this.configService.get<string>('AWS_MAIL_PASS');
    // console.log({user: process.env.AWS_MAIL_PASS, pass: process.env.AWS_MAIL_USER})
    const fromEmail = this.configService.get<string>('AWS_MAIL_FROM');
    // console.log(`${emailTitle} <${fromEmail}>`)
    const transporter = nodemailer.createTransport({
      host: awsMail,
      auth: {
        user: awsUser,
        pass: awsPass,
      },
    });

    // console.log(path.join(__dirname, '../output/000000010.pdf'))
    try {
      await transporter.sendMail({
        from: `${emailTitle} <${fromEmail}>`, // sender address
        to: emailReciever, // list of receivers
        subject: emailSubject, // Subject line
        cc: withCopy,
        bcc: withHiddenCopy,
        html: template, // html body
        attachments,
        list: {
          unsubscribe: 'none',
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
