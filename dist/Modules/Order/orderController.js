"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const catchAsync_1 = __importDefault(require("../../Utilities/catchAsync"));
const sendResponse_1 = __importDefault(require("../../Utilities/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const orderService_1 = require("./orderService");
const Pick_1 = __importDefault(require("../../App/Common/Pick"));
const userConstant_1 = require("../User/userConstant");
const orderConstant_1 = require("./orderConstant");
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orderService_1.orderService.createOrderIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Order Create Successfully",
        data: result,
    });
}));
const allOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filterData = (0, Pick_1.default)(req.query, orderConstant_1.orderFilterableFields);
    const optionsData = (0, Pick_1.default)(req.query, userConstant_1.optionsPaginationFields);
    const result = yield orderService_1.orderService.getAllOrderFormDB(filterData, optionsData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Order Fetch Successfully",
        data: result,
    });
}));
const allDeliveryOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filterData = (0, Pick_1.default)(req.query, orderConstant_1.orderFilterableFields);
    const optionsData = (0, Pick_1.default)(req.query, userConstant_1.optionsPaginationFields);
    const result = yield orderService_1.orderService.getAllOrderDeliveryFormDB(filterData, optionsData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Order Fetch Successfully",
        data: result,
    });
}));
const singleOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield orderService_1.orderService.getSingleOrderFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Single Order Fetch Successfully",
        data: result,
    });
}));
const updateOrderStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log("Req Body:", req.body);
    const result = yield orderService_1.orderService.orderProductStatusUpdate(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Order Status Updated Successfully",
        data: result,
    });
}));
const orderDeleted = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield orderService_1.orderService.deleteOrderProduct(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Order Delete Successfully",
        data: result,
    });
}));
const sendMail = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield orderService_1.orderService.sendEmail(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Email Send Successfully",
        data: result,
    });
}));
const getUserAllOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const filterData = (0, Pick_1.default)(req.query, orderConstant_1.orderFilterableFields);
    const optionsData = (0, Pick_1.default)(req.query, userConstant_1.optionsPaginationFields);
    const result = yield orderService_1.orderService.getUserOrderProduct(user, filterData, optionsData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Order Fetch Successfully",
        data: result,
    });
}));
exports.orderController = {
    createOrder,
    allOrder,
    singleOrder,
    updateOrderStatus,
    orderDeleted,
    allDeliveryOrder,
    sendMail,
    getUserAllOrder,
};
