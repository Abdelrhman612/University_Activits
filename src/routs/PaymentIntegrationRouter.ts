import express from "express";
import { createCheckoutSession } from "../Controllers/PaymentIntegrationController";
const router = express.Router();
router.post("/checkout-session", createCheckoutSession);
export const PaymentRouter = router;
