import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { STRIPE_SECRET_KEY } from "../utills/dotenv";
import Stripe from "stripe";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utills/appError";
import { fail, success } from "../utills/HttpStatusText";
import { url } from "node:inspector";
const stripe = new Stripe(STRIPE_SECRET_KEY);
export const createCheckoutSession = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { activityId, amount, userId } = req.body;
    if (!amount || !activityId || !userId) {
      const error = new AppError("Missing required fields", 400, fail);
      return next(error);
    }
    const activity = await prisma.activity.findUnique({
      where: { id: activityId },
    });
    if (!activity) {
      const Error = new AppError("Activity is not found", 404, fail);
      return next(Error);
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: activity.name },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://google.com",
      cancel_url: "https://google.com",
    });
    await prisma.payment.create({
      data: {
        amount: amount,
        currency: "usd",
        status: "pending",
        stripeSessionId: session.id,
        userId: userId,
        activityId: activityId,
      },
    });
    res.status(200).json({ status: success, url: session.url });
  }
);
