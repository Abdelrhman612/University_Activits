import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { AppError } from "../utills/appError";
import { fail, success } from "../utills/HttpStatusText";
import { Activity } from "../SchemaiNterFace/interfaceUsers";
import { ActivitySelectFields } from "../utills/userSelectFields";
const prisma = new PrismaClient();
export const CreateActivitys = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, status, userId } = req.body;
    if (!name) {
      const error = new AppError("Name Is Required", 400, fail);
      return next(error);
    }
    const newActivity: Activity = await prisma.activity.create({
      data: { name, description, status, userId },
      select: ActivitySelectFields,
    });
    res.status(201).json({ success: success, date: newActivity });
  }
);
export const GetActivities = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const Activitis = await prisma.activity.findMany();
    res.status(200).json({ status: success, data: Activitis });
  }
);
export const UpdateActivity = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { Id } = req.params;
    const { name, description, status, userId } = req.body;
    const UpActivity = await prisma.activity.findUnique({
      where: { id: Id },
    });
    if (!UpActivity) {
      const error = new AppError("Activity Is Not Found", 404, fail);
      return next(error);
    }
    const newActivity: Activity = await prisma.activity.update({
      where: { id: Id },
      data: { name, description, status, userId },
    });
    res.status(200).json({ status: success, data: newActivity });
  }
);
export const deleteActivity = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { Id } = req.params;
    await prisma.activity.delete({ where: { id: Id } });

    res.status(200).json({
      status: success,
      message: "Delete Activity is successfully",
      data: null,
    });
  }
);
