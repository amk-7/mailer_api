import { VercelRequest, VercelResponse } from "@vercel/node";
import sendMail from "./utils/mail";

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method !== "POST") {
    response.statusCode = 405;
    response.end("Method Not Allowed");
    return;
  }

  const { subject, message, mail_to } = request.body || {};

  if (!subject || !message || !mail_to) {
    response.statusCode = 400;
    response.end("Missing subject, message or mail_to");
    return;
  }

    const result = await sendMail({
        subject: subject,
        message: message,
        mail_to: mail_to
    });
    if (result.success) {
        response.writeHead(200, { "Content-Type": "application/json" });
    } else {
        response.writeHead(500, { "Content-Type": "application/json" });
    }
    response.end(JSON.stringify(result));
};
