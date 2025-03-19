import express from "express";
import { PORT } from "./utills/dotenv";
import { ConnectDB } from "./database/db";
import { UserRouter } from "./routs/UserRouter";
import { error } from "./utills/HttpStatusText";
import { Request, Response, NextFunction } from "express-serve-static-core";
import { activityRouter } from "./routs/activitiesRouter";
import path from "node:path";
const app = express();
app.use(express.json());
app.use("/Uploads", express.static(path.join(__dirname, "../Uploads")));
ConnectDB();
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
