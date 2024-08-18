// test-email.js
const nodemailer = require('nodemailer');

async function sendTestEmail() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:'kartik292004@gmail.com', // Your email
      pass: 'obte groc ratl gban', // Your email password
    },
  });

  try {
    await transporter.sendMail({
      from: 'kartik292004@gmail.com',
      to: 'sritik_be23@thapar.edu',
      subject: 'Test Email',
      text: 'This is a test email',
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

sendTestEmail();
