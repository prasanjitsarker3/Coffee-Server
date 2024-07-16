"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../Middleware/auth"));
const client_1 = require("@prisma/client");
const productController_1 = require("./productController");
const validationRequest_1 = __importDefault(require("../../Middleware/validationRequest"));
const productValidation_1 = require("./productValidation");
const router = express_1.default.Router();
router.post("/create", (0, auth_1.default)(client_1.UserRole.SUPPER_ADMIN, client_1.UserRole.ADMIN), (0, validationRequest_1.default)(productValidation_1.productCreateValidationSchema), productController_1.productController.createProduct);
router.get("/", productController_1.productController.allProduct);
router.get("/:id", productController_1.productController.singleProduct);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.SUPPER_ADMIN, client_1.UserRole.ADMIN), productController_1.productController.deleteProduct);
router.patch("/updated/:id", (0, auth_1.default)(client_1.UserRole.SUPPER_ADMIN, client_1.UserRole.ADMIN), 
// validationRequest(productUpdatedValidationSchema),
productController_1.productController.updatedProduct);
router.get("/category/:id", productController_1.productController.categoryProduct);
exports.productRoute = router;
