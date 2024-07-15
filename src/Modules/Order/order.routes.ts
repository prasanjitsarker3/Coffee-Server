import express from "express";
import { orderController } from "./orderController";
import auth from "../../Middleware/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post("/create", orderController.createOrder);
router.get("", orderController.allOrder);
router.get(
  "/my-order",
  auth(UserRole.ADMIN, UserRole.USER),
  orderController.getUserAllOrder
);
router.get("/delivery", orderController.allDeliveryOrder);
router.get("/:id", orderController.singleOrder);
router.patch("/status/:id", orderController.updateOrderStatus);
router.patch("/delete/:id", orderController.orderDeleted);
router.patch("/delivery/:id", orderController.sendMail);

export const orderRoutes = router;
