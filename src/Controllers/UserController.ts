import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import e, { Request, Response, NextFunction } from "express";
import { User } from "../SchemaiNterFace/interfaceUsers";
import { GenerateJwt } from "../utills/GenerateJwt";
import { success, fail } from "../utills/HttpStatusText";
import { userSelectFields } from "../utills/userSelectFields";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { AppError } from "../utills/appError";
import { SendEmail } from "../utills/SendEmail";
import bcrypt from "bcrypt";
const Expired = new Date(Date.now() + 10 * 60 * 1000);
const prisma = new PrismaClient();
export const Register = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password, role } = req.body;
    if (!firstName || !email) {
      const err = new AppError("Full Name Or Email Is Requierd", 400, fail);
      return next(err);
    }
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
        avatar: req.file?.filename,
      },
      select: userSelectFields,
    });
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
      const error = new AppError("User is not found", 404, fail);
      return next(error);
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
    res.status(200).json({ status: success, data: { token } });
  }
);

export const GetUsers = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const users: User[] = await prisma.user.findMany({
      select: {
        ...userSelectFields,
        activities: true,
      },
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
    const { firstName, lastName, email, role } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { id: Id },
    });
    if (!existingUser) {
      const error = new AppError("User Is Not Found", 404, fail);
      return next(error);
    }
    const updatedData: any = { firstName, lastName, email, role };
    const NewUser: User = await prisma.user.update({
      where: { id: Id },
      data: updatedData,
      select: userSelectFields,
    });
    res.status(200).json({ success: success, data: NewUser });
  }
);
export const changeUserPassword = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;
    const { Id } = req.params;
    if (!Id) {
      const error = new AppError("Unauthorized", 404, fail);
      return next(error);
    }
    if (!password) {
      const error = new AppError("password is requred", 400, fail);
      return next(error);
    }
    const HashedPassword: any = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: Id },
      data: { password: HashedPassword },
    });
    res
      .status(200)
      .json({ status: success, message: "Password Update Successfully" });
  }
);
export const forgetpassword = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      const error = new AppError(
        `There is no user with that email ${email}`,
        404,
        fail
      );
      return next(error);
    }

    const resetCode: string = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const HashedresetCode = crypto
      .createHash("sha256")
      .update(resetCode)
      .digest("hex");

    await prisma.user.update({
      where: { email: email },
      data: {
        PasswordResetCode: HashedresetCode,
        PasswordResetExpires: Expired,
        PasswordResetverified: false,
      },
    });
    const message = `Hi ${user.firstName}, we've received a request to reset your password on your university_activits Account. \n Your reset code is: ${resetCode} \n. If you didn't request this, you can safely ignore this message.`;
    await SendEmail({
      email: user.email,
      subject: "Password Reset Code",
      message,
    });

    res
      .status(200)
      .json({ status: success, message: "Reset Code is successfully" });
  }
);
export const verfiyPassResetCode = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { resetCode, PasswordResetCode } = req.body;
    if (!resetCode) {
      const error = new AppError("reset Code is required", 400, fail);
      return next(error);
    }
    const HashedresetCode = crypto
      .createHash("sha256")
      .update(resetCode)
      .digest("hex");

    const user = await prisma.user.findFirst({
      where: { PasswordResetCode, PasswordResetExpires: { gt: new Date() } },
    });
    if (!user) {
      const error = new AppError("Reset code invalid or expired", 404, fail);
      return next(error);
    }
    await prisma.user.update({
      where: { id: user.id },
      data: { PasswordResetverified: true },
    });

    res
      .status(200)
      .json({ status: success, message: "Reset code verified successfully" });
  }
);

export const resetPassword = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      const error = new AppError(
        `There is no user with that email ${email}`,
        404,
        fail
      );
      return next(error);
    }
    if (!user.PasswordResetverified) {
      const Error = new AppError(` Reset Code Not verified`, 400, fail);
      return next(Error);
    }
    const HashedPassword: any = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { email: email },
      data: {
        password: HashedPassword,
        PasswordResetCode: null,
        PasswordResetExpires: null,
        PasswordResetverified: null,
      },
    });
    const token = await GenerateJwt(email);
    res.status(200).json({
      status: success,
      message: "Reset password is successfully",
      token: token,
    });
  }
);
