import express from "express";
import { categoryController } from "./categoryController";
import validationRequest from "../../Middleware/validationRequest";
import {
  categoryUpdateValidation,
  categoryValidation,
} from "./categoryIterface";
import auth from "../../Middleware/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();
router.post(
  "/create",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN),
  validationRequest(categoryValidation),
  categoryController.createCategory
);

router.get("", categoryController.allCategory);
router.patch(
  "/:id",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN),
  categoryController.deleteCategory
);
router.patch(
  "/update/:id",
  validationRequest(categoryUpdateValidation),
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN),
  categoryController.updatedCategory
);

export const categoryRoutes = router;
