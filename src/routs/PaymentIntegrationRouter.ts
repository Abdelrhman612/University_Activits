import express from "express";
import * as payment from "../Controllers/PaymentIntegrationController";
const router = express.Router();
router.post("/checkout-session", payment.createCheckoutSession);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  payment.stripeWebhook
);
router.get("/", payment.getAllPayments);
export const PaymentRouter = router;
