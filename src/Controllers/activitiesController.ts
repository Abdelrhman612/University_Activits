import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { AppError } from "../utills/appError";
import { fail, success } from "../utills/HttpStatusText";
const prisma = new PrismaClient();
export const CreateActivitys = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, status, userId } = req.body;
    const newActivity = await prisma.activity.create({
      data: { name, description, status, userId },
    });
    if (!name) {
      const error = new AppError("Name Is Required", 400, fail);
      return next(error);
    }
    res.status(201).json({ success: success, date: newActivity });
  }
);
