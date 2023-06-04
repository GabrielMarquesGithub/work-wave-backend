export interface IEmailProvider {
  sendEmail(to: string, subject: string, body: string): void;
}
