import express from "express";
import { userRoutes } from "../Modules/User/user.routes";
import { authRoutes } from "../Modules/Auth/auth.routes";
import { categoryRoutes } from "../Modules/Category/category.routes";
import { productRoute } from "../Modules/Products/product.routes";
import { orderRoutes } from "../Modules/Order/order.routes";
import { paymentRoutes } from "../Modules/Payment/payment.routes";

const router = express.Router();

const moduleRoute = [
  {
    path: "/users",
    element: userRoutes,
  },
  {
    path: "/auth",
    element: authRoutes,
  },
  {
    path: "/category",
    element: categoryRoutes,
  },
  {
    path: "/product",
    element: productRoute,
  },
  {
    path: "/order",
    element: orderRoutes,
  },
  {
    path: "/payment",
    element: paymentRoutes,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.element));
export default router;
