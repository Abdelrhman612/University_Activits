import { Request, Response, NextFunction } from "express";
import { fail } from "../utills/HttpStatusText";
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { role } = (req as any).user;
  if (role !== "Admin") {
    res
      .status(403)
      .json({ success: fail, message: "Access denied , Admins Only" });
    return;
  }

  next();
};
