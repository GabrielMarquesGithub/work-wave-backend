import nodemailer from "nodemailer";
import { IEmailProvider } from "../interfaces/emailProvider.interface";
import { AppError } from "../errors/app.error";

class EmailProvider implements IEmailProvider {
  private transporter: nodemailer.Transporter;
  private email: string;

  constructor(email: string, password: string) {
    this.email = email;
    // Configuração do transporte do Nodemailer
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
    });

    console.log(this.transporter.verify);
  }

  sendEmail(to: string, subject: string, body: string): void {
    const mailOptions = {
      from: this.email,
      to: to,
      subject: subject,
      html: body,
    };

    // Enviando email
    this.transporter.sendMail(mailOptions, (error, info) => {
      // Tratando erro durante envio
      if (error) {
        throw new AppError("Error sending email!", 400);
      }
    });
  }
}

export { EmailProvider };
