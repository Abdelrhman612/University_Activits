import { PrismaClient, roles, user } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { User } from "../UsersSchema/interface";
import { GenerateJwt } from "../utills/GenerateJwt";
import { success, fail } from "../utills/HttpStatusText";
import { userSelectFields } from "../utills/userSelectFields";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { AppError } from "../utills/appError";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
export const Register = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password, role } = req.body;
    const OneUser = await prisma.user.findUnique({ where: { email: email } });
    if (OneUser) {
      const error = new AppError("User Is Exists", 400, fail);
      return next(error);
    }
    const HashedPassword = await bcrypt.hash(password, 10);
    const AddUser: User = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: HashedPassword,
        role: role ? role : "Student",
      },
      select: userSelectFields,
    });
    if (!firstName || !lastName || !email) {
      const error = new AppError("Full Name Or Email Is Requierd", 400, fail);
      return next(error);
    }

    const token = await GenerateJwt({
      email: AddUser.email,
      role: AddUser.role,
    });
    res.status(201).json({
      status: success,
      data: AddUser,
      token: { StringToken: token },
    });
  }
);
export const Login = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new AppError("Email Or Password Is Requierd", 400, fail);
      return next(error);
    }
    const OneUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!OneUser) {
      res.status(404).json({ success: fail, message: "User is not found" });
      return;
    }
    const MatchedPassword = await bcrypt.compare(password, OneUser.password);
    if (!MatchedPassword) {
      const error = new AppError("Password Is Wrong", 401, fail);
      return next(error);
    }
    const token = await GenerateJwt({
      email: OneUser.email,
      role: OneUser.role,
    });
    res.status(200).json({ status: success, data: token });
  }
);

export const GetUsers = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const users: User[] = await prisma.user.findMany({
      select: userSelectFields,
    });
    res.status(200).json({ status: success, data: users });
  }
);
export const GetUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { Id } = req.params;
    const user = await prisma.user.findUnique({ where: { id: Id } });
    if (!user) {
      const error = new AppError("User Is Not Found", 404, fail);
      return next(error);
    }
    res.status(200).json({ success: success, data: user });
  }
);
export const deleteUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { Id } = req.params;
    const userExists = await prisma.user.findUnique({
      where: { id: Id },
    });

    if (!userExists) {
      const error = new AppError("User Is Not Found", 404, fail);
      next(error);
    }
    await prisma.user.delete({ where: { id: Id } });
    res
      .status(200)
      .json({ status: success, message: "delete user is successfuly" });
  }
);

export const UpdateUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { Id } = req.params;
    const { firstName, lastName, email, password, role } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { id: Id },
    });

    if (!existingUser) {
      const error = new AppError("User Is Not Found", 404, fail);
      return next(error);
    }
    const updatedData: any = { firstName, lastName, email, role };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }
    const NewUser: User = await prisma.user.update({
      where: { id: Id },
      data: updatedData,
      select: userSelectFields,
    });
    res.status(200).json({ success: success, data: NewUser });
  }
);
