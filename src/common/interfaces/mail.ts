import { Attachment } from 'nodemailer/lib/mailer';

export interface EmailAdapter {
  sendEmail(params: emailSender): Promise<void>;
}

export interface emailSender {
  template: string;
  emailReciever: string;
  emailSubject: string;
  emailTitle: string;
  numDoc?: string;
  withCopy?: string[];
  withHiddenCopy?: string[];
  attachments?: Attachment[];
}

export interface attachmet {
  filename: string;
  path?: string;
  contentType?: string;
  content?: string;
  raw?: string;
}
