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
exports.paymentController = void 0;
const catchAsync_1 = __importDefault(require("../../Utilities/catchAsync"));
const paymentService_1 = require("./paymentService");
const sendResponse_1 = __importDefault(require("../../Utilities/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const cashPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield paymentService_1.paymentService.cashOnPayment(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Order Successfully",
        data: result,
    });
}));
const initPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const result = yield paymentService_1.paymentService.initPayment(orderId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Payment Init Successfully",
        data: result,
    });
}));
const validatePayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield paymentService_1.paymentService.validationPayment(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Validate Payment Successfully !",
        data: result,
    });
}));
const getMetaData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield paymentService_1.paymentService.metaData();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Meta Data Successfully !",
        data: result,
    });
}));
const getProductPieData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield paymentService_1.paymentService.getProductPiaChartData();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Meta Data Successfully !",
        data: result,
    });
}));
const getOrderMonthMetaData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield paymentService_1.paymentService.orderMonthlyMetaData();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Meta Data Successfully !",
        data: result,
    });
}));
exports.paymentController = {
    cashPayment,
    initPayment,
    validatePayment,
    getMetaData,
    getProductPieData,
    getOrderMonthMetaData,
};
