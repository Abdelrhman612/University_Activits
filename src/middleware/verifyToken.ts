import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_JWT } from "../dotenv/dotenv";
import { AppError } from "../utills/appError";
import { fail, error } from "../utills/HttpStatusText";
interface AuthRequest extends Request {
  user?: { email: string; role: string };
}
export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const Error = new AppError(
      "403 Forbidden: Unauthorized access attempt",
      403,
      fail
    );
    return next(Error);
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    const error = new AppError("Invalid token format", 403, fail);
    return next(error);
  }
  try {
    const decoded = jwt.verify(token, SECRET_JWT) as {
      payload: { email: string; role: string };
    };
    req.user = decoded.payload;
    next();
  } catch (err) {
    const Error = new AppError(
      "Invalid or expired toke . Please log in again",
      401,
      error
    );
    return next(Error);
  }
};
