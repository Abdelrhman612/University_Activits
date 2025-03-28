import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import { isAdmin } from "../middleware/isAdmin";
import * as Users from "../Controllers/UserController";
import multer from "multer";
import { storage, fileFilter } from "../utills/multerHandler";
const upload = multer({
  storage,
  fileFilter,
});
const router = express.Router();
router.get("/", verifyToken, isAdmin, Users.GetUsers);
router.get("/:Id", Users.GetUser);
router.patch("/:Id", verifyToken, isAdmin, Users.UpdateUser);
router.put("/ChangePassword/:Id", Users.changeUserPassword);
router.delete("/:Id", verifyToken, isAdmin, Users.deleteUser);
router.post("/Register", upload.single("avatar"), Users.Register);
router.post("/Login", Users.Login);
router.post("/forgetPassword", Users.forgetpassword);
router.post("/verfiyPassResetCode", Users.verfiyPassResetCode);
router.put("/ResetPassword", Users.resetPassword);

export const UserRouter = router;
