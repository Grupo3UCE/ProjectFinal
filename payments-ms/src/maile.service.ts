import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Configura tu servidor SMTP
      port: 465,
      secure: true,
      auth: {
        user: 'andyricardog234@gmail.com', // Tu email
        pass: 'wvwuagzawhsgdeee', // Tu contraseña
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'andyricardog234@gmail.com',
      to,
      subject,
      text,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
