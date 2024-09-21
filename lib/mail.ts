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
    text: `Hi,

Thank you for signing up for Fooddle! We're excited to have you on board.

To complete your registration, please verify your email address by clicking the link below:

${verificationLink}

If you didn't create an account with us, please ignore this email.

Welcome to the Fooddle community!

Best regards,
The Fooddle Team `,
  });

  console.log('Message sent: %s', info.messageId);
}
