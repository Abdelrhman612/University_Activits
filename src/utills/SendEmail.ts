import nodemailer from "nodemailer";
import * as env from "./dotenv";

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

export const SendEmail = async (options: EmailOptions) => {
  const transporter = nodemailer.createTransport({
    host: env.EMAIL_HOST,
    port: env.EMAIL_PORT,
    secure: true,
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: env.EMAIL_FROM,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px; background: #f9f9f9;">
      <h2 style="color: #333;">Hi ${options.email.split("@")[0]},</h2>
      <p style="font-size: 16px; color: #555;">We've received a request to reset your password on your <strong>University Activities</strong> account.</p>
      <p style="font-size: 16px; color: #555;">Your reset code is:</p>
      <div style="background: #007BFF; color: white; padding: 10px; text-align: center; border-radius: 4px; font-size: 24px; letter-spacing: 2px; margin: 10px 0;">
        ${options.message.match(/\d{6}/)}
      </div>
      <p style="font-size: 14px; color: #999;">If you didn't request this, you can safely ignore this message.</p>
      <p style="font-size: 14px; color: #333;">Thanks,<br>University Activities Team</p>
    </div>
  `,
  };

  await transporter.sendMail(mailOptions);
};
