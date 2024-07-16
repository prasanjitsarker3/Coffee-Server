"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const orderController_1 = require("./orderController");
const auth_1 = __importDefault(require("../../Middleware/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/create", orderController_1.orderController.createOrder);
router.get("", orderController_1.orderController.allOrder);
router.get("/my-order", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), orderController_1.orderController.getUserAllOrder);
router.get("/delivery", orderController_1.orderController.allDeliveryOrder);
router.get("/:id", orderController_1.orderController.singleOrder);
router.patch("/status/:id", orderController_1.orderController.updateOrderStatus);
router.patch("/delete/:id", orderController_1.orderController.orderDeleted);
router.patch("/delivery/:id", orderController_1.orderController.sendMail);
exports.orderRoutes = router;
