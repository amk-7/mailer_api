import nodemailer from "nodemailer";

interface Mail {
    subject: string,
    message: string,
    mail_to: string
}


interface SendMailResponse {
    success: boolean,
}

export default async function sendMail({subject, message, mail_to}: Mail): Promise<SendMailResponse> {
    try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT),
          secure: true,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });
    
        await transporter.sendMail({
          from: `"Yield" <${process.env.SMTP_USER}>`,
          to: mail_to,
          subject,
          text: message,
        });
    
        return { success: true };
      } catch (error) {
        console.error(error);
        return { success: false };
      }
}