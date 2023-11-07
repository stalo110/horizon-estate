import { createTransport } from "nodemailer";
interface CustomError extends Error {
  message: string;
  code: number;
}
interface Mail {
  from: string;
  to: string;
  subject: string;
  text: string;
}

export const sendMail = async (mailObj: Mail) => {
  const { from, to, subject, text } = mailObj;
  try {
    let transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    let info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
    });
    console.log(`Message sent: ${info.messageId}`);
  } catch (error) {
    const err = error as CustomError;
    throw new Error(
      `Something went wrong in the sendmail method.Error:${err.message}`
    );
  }
};

//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
