"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = __importDefault(require("../../Middleware/validationRequest"));
const userValidation_1 = require("./userValidation");
const userController_1 = require("./userController");
const auth_1 = __importDefault(require("../../Middleware/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/create", (0, validationRequest_1.default)(userValidation_1.adminValidationSchema.createAdminSchema), userController_1.userController.createAdmin);
router.get("", userController_1.userController.getAllUser);
router.get("/me", (0, auth_1.default)(client_1.UserRole.SUPPER_ADMIN, client_1.UserRole.ADMIN, client_1.UserRole.USER), userController_1.userController.myProfile);
router.patch("/update-profile", (0, auth_1.default)(client_1.UserRole.SUPPER_ADMIN, client_1.UserRole.ADMIN, client_1.UserRole.USER), userController_1.userController.profileUpdate);
router.patch("/role/:id", userController_1.userController.roleChange);
router.patch("/delete/:id", userController_1.userController.deleteUser);
exports.userRoutes = router;
