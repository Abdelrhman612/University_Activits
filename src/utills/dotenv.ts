import dotenv from "dotenv";
dotenv.config();
export const PORT = process.env.PORT;
export const SECRET_JWT = process.env.SECRET_JWT as string;
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;
export const EMAIL_PORT = Number(process.env.EMAIL_PORT);
export const EMAIL_HOST = process.env.EMAIL_HOST;
export const EMAIL_FROM = process.env.EMAIL_FROM;
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;
export const STRIPE_WEBHOOK_SECRET = process.env
  .STRIPE_WEBHOOK_SECRET as string;
