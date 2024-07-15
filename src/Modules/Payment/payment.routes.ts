import express from "express";
import { paymentController } from "./paymentController";

const router = express.Router();

router.post("/cash", paymentController.cashPayment);
router.post("/init/:orderId", paymentController.initPayment);
router.post("/ipn", paymentController.validatePayment);
router.get("/meta", paymentController.getMetaData);
router.get("/product-meta", paymentController.getProductPieData);
router.get("/monthly", paymentController.getOrderMonthMetaData);

export const paymentRoutes = router;
