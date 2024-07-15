import express from "express";
import validationRequest from "../../Middleware/validationRequest";
import { adminValidationSchema } from "./userValidation";
import { userController } from "./userController";
import auth from "../../Middleware/auth";
import { UserRole } from "@prisma/client";
const router = express.Router();

router.post(
  "/create",
  validationRequest(adminValidationSchema.createAdminSchema),
  userController.createAdmin
);

router.get("", userController.getAllUser);
router.get(
  "/me",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  userController.myProfile
);
router.patch(
  "/update-profile",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  userController.profileUpdate
);

router.patch("/role/:id", userController.roleChange);
router.patch("/delete/:id", userController.deleteUser);

export const userRoutes = router;
