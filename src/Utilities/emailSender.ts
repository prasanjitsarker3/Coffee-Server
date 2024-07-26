import nodemailer from "nodemailer";
import config from "../App/config";

const emailSender = async (email: string, html: any) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: config.email,
      pass: config.appPassword,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: '"The Daily Cup" <sarkerprasanjit379@gmail.com>',
    to: email,
    subject: "Product Order",
    html,
  });
  //Checking
  return info.messageId;
};

export default emailSender;
