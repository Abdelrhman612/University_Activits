import express from "express";
import { PORT } from "./dotenv/dotenv";
import { ConnectDB } from "./database/db";
import { UserRouter } from "./routs/UserRouter";
import { error } from "./utills/HttpStatusText";
import { Request, Response, NextFunction } from "express-serve-static-core";
import { activityRouter } from "./routs/activitiesRouter";
const app = express();
app.use(express.json());
ConnectDB();
app.use("/api/users", UserRouter);
app.use("/api/activities", activityRouter);
app.all("*", (req, res) => {
  res
    .status(404)
    .json({ status: error, message: "thise resource is not available" });
});
app.use((Error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(Error.statusCode || 500).json({
    status: Error.statusText,
    message: Error.message,
  });
});
app.listen(PORT, () => {
  console.log(`Running server on port ${PORT} `);
});
