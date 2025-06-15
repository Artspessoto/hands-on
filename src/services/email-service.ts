import nodemailer from "nodemailer";
import { env } from "../validations/env";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  secure: false,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

class EmailService {
  public async sendVerificationEmail(email: string, token: string) {
    const verifyUrl = `localhost:${env.PORT}/verify-email?token=${token}`;

    const mailOptions = {
      from: `Hands on 👋" <${env.SMTP_USER}>`,
      to: email,
      subject: "Verifique seu e-mail ✔",
      html: `
      <p>Olá! Clique no link abaixo para verificar seu e-mail:</p>
      <a href="${verifyUrl}">${verifyUrl}</a>
      <p>Esse link expira em 24 horas.</p>
    `,
    };

    await transporter.sendMail(mailOptions);
  }
}

export default EmailService;
