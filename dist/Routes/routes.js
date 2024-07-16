"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../Modules/User/user.routes");
const auth_routes_1 = require("../Modules/Auth/auth.routes");
const category_routes_1 = require("../Modules/Category/category.routes");
const product_routes_1 = require("../Modules/Products/product.routes");
const order_routes_1 = require("../Modules/Order/order.routes");
const payment_routes_1 = require("../Modules/Payment/payment.routes");
const router = express_1.default.Router();
const moduleRoute = [
    {
        path: "/users",
        element: user_routes_1.userRoutes,
    },
    {
        path: "/auth",
        element: auth_routes_1.authRoutes,
    },
    {
        path: "/category",
        element: category_routes_1.categoryRoutes,
    },
    {
        path: "/product",
        element: product_routes_1.productRoute,
    },
    {
        path: "/order",
        element: order_routes_1.orderRoutes,
    },
    {
        path: "/payment",
        element: payment_routes_1.paymentRoutes,
    },
];
moduleRoute.forEach((route) => router.use(route.path, route.element));
exports.default = router;
