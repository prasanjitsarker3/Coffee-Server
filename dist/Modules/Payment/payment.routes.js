"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const paymentController_1 = require("./paymentController");
const router = express_1.default.Router();
router.post("/cash", paymentController_1.paymentController.cashPayment);
router.post("/init/:orderId", paymentController_1.paymentController.initPayment);
router.post("/ipn", paymentController_1.paymentController.validatePayment);
router.get("/meta", paymentController_1.paymentController.getMetaData);
router.get("/product-meta", paymentController_1.paymentController.getProductPieData);
router.get("/monthly", paymentController_1.paymentController.getOrderMonthMetaData);
exports.paymentRoutes = router;
