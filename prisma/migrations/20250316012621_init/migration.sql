/*
  Warnings:

  - You are about to drop the column `passwordResetCode` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "passwordResetCode",
ADD COLUMN     "PasswordResetCode" TEXT;
