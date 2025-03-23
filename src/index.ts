import express from "express";
import { PORT } from "./utills/dotenv";
import { ConnectDB } from "./database/db";
import { UserRouter } from "./routs/UserRouter";
import { error } from "./utills/HttpStatusText";
import { Request, Response, NextFunction } from "express-serve-static-core";
import { activityRouter } from "./routs/activitiesRouter";
import path from "node:path";
import { PaymentRouter } from "./routs/PaymentIntegrationRouter";
const app = express();
app.use("/api/stripe/webhook", express.raw({ type: "application/json" }));
app.use(express.json());
app.use("/Uploads", express.static(path.join(__dirname, "../Uploads")));
ConnectDB();
app.use("/api/stripe", PaymentRouter);
app.use("/api/users", UserRouter);
app.use("/api/activities", activityRouter);
app.all("*", (req, res) => {
  res
    .status(404)
    .json({ status: error, message: "thise resource is not available" });
});
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    status: err.statusText,
    message: err.message,
  });
});
app.listen(PORT, () => {
  console.log(`Running server on port ${PORT} `);
});
