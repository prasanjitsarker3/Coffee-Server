import express from "express";
import auth from "../../Middleware/auth";
import { UserRole } from "@prisma/client";
import { productController } from "./productController";
import validationRequest from "../../Middleware/validationRequest";
import {
  productCreateValidationSchema,
  productUpdatedValidationSchema,
} from "./productValidation";

const router = express.Router();

router.post(
  "/create",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN),
  validationRequest(productCreateValidationSchema),
  productController.createProduct
);
router.get("/", productController.allProduct);
router.get("/:id", productController.singleProduct);
router.patch(
  "/:id",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN),
  productController.deleteProduct
);
router.patch(
  "/updated/:id",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN),
  // validationRequest(productUpdatedValidationSchema),
  productController.updatedProduct
);

export const productRoute = router;
