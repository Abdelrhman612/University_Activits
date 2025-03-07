import express from "express";
import * as activity from "../Controllers/activitiesController";
const router = express.Router();
router.post("/", activity.CreateActivitys);

export const activityRouter = router;
