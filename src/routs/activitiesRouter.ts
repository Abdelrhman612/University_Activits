import express from "express";
import { isAdmin } from "../middleware/isAdmin";
import * as activity from "../Controllers/activitiesController";
const router = express.Router();
router.post("/", isAdmin, activity.CreateActivitys);
router.get("/", activity.GetActivities);
router.patch("/:Id", isAdmin, activity.UpdateActivity);
router.delete("/:Id", isAdmin, activity.deleteActivity);
export const activityRouter = router;
