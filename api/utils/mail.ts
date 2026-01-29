import nodemailer from "nodemailer";
import 'dotenv/config'

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

        console.log(process.env.SMTP_USER);
        
    
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

sendMail({
    "subject": "Test",
    "message": "message de test",
    "mail_to": "abdoulmalikkondi8@gmail.com"
})