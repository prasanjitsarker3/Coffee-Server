"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("./categoryController");
const validationRequest_1 = __importDefault(require("../../Middleware/validationRequest"));
const categoryIterface_1 = require("./categoryIterface");
const auth_1 = __importDefault(require("../../Middleware/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/create", (0, auth_1.default)(client_1.UserRole.SUPPER_ADMIN, client_1.UserRole.ADMIN), (0, validationRequest_1.default)(categoryIterface_1.categoryValidation), categoryController_1.categoryController.createCategory);
router.get("", categoryController_1.categoryController.allCategory);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.SUPPER_ADMIN, client_1.UserRole.ADMIN), categoryController_1.categoryController.deleteCategory);
router.patch("/update/:id", (0, validationRequest_1.default)(categoryIterface_1.categoryUpdateValidation), (0, auth_1.default)(client_1.UserRole.SUPPER_ADMIN, client_1.UserRole.ADMIN), categoryController_1.categoryController.updatedCategory);
exports.categoryRoutes = router;
