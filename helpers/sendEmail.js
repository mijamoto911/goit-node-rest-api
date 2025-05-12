import nodemailer from 'nodemailer';
import 'dotenv/config';

const { BREVO_EMAIL, BREVO_SMTP_KEY } = process.env;

const nodemailerConfig = {
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: BREVO_EMAIL,
    pass: BREVO_SMTP_KEY,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (data) => {
  const email = { ...data, from: `Mijamoto ${BREVO_EMAIL}` };
  return transport.sendMail(email);
};

export default sendEmail;
