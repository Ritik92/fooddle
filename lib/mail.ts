// lib/mail.ts
import nodemailer from 'nodemailer';

export async function sendVerificationEmail(email: string, verificationLink: string): Promise<void> {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });
    console.log('things')
  let info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification',
    text: `Please verify your email by clicking on the following link: ${verificationLink}`,
  });

  console.log('Message sent: %s', info.messageId);
}
