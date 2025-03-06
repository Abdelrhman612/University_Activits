import { Request, Response, NextFunction } from "express";
export const asyncWrapper = (AsyncFunc: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    AsyncFunc(req, res, next).catch((Error: any) => {
      next(Error);
    });
  };
};
