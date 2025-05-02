// filepath: c:\Users\king1\Desktop\aquilablog\packages\api\src\utils\email.ts
import nodemailer from 'nodemailer';

const nodemailerGmail = nodemailer.createTransport({
  service: 'gmail', // Use Gmail's SMTP service
  auth: {
    user: process.env.GMAIL_SMTP_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // Use the app password here
  },
});

export const sendEmail = ({ to, subject, html }) => {
  return new Promise((resolve, reject) => {
    if (!process.env.GMAIL_SMTP_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.log('You need to provide GMAIL_SMTP_USER and GMAIL_APP_PASSWORD environment variables for sending emails.');
      return resolve('An error occurred while sending an email: (Credentials missing).');
    }

    nodemailerGmail.sendMail(
      {
        from: `AquillaCyber <${process.env.GMAIL_SMTP_USER}>`, // Use your Gmail address as the sender
        to,
        subject,
        html,
      },
      function (err, info) {
        if (err) {
          console.log('An error occurred while sending an email: ', err);
          return reject(err);
        } else {
          return resolve(info);
        }
      }
    );
  });
};