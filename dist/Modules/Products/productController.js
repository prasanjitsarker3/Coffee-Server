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
exports.productController = void 0;
const catchAsync_1 = __importDefault(require("../../Utilities/catchAsync"));
const productService_1 = require("./productService");
const sendResponse_1 = __importDefault(require("../../Utilities/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const Pick_1 = __importDefault(require("../../App/Common/Pick"));
const productConstant_1 = require("./productConstant");
const userConstant_1 = require("../User/userConstant");
const createProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productService_1.productService.createProductDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Product Create Successfully",
        data: result,
    });
}));
const allProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filterData = (0, Pick_1.default)(req.query, productConstant_1.petFilterableFields);
    const optionsData = (0, Pick_1.default)(req.query, userConstant_1.optionsPaginationFields);
    const result = yield productService_1.productService.getAllProductFromDB(filterData, optionsData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product Get Successfully",
        data: result,
    });
}));
const singleProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield productService_1.productService.singleProductFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Fetch Single Product Successfully",
        data: result,
    });
}));
const deleteProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield productService_1.productService.deleteProductFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Delete Product Successfully",
        data: result,
    });
}));
const updatedProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield productService_1.productService.updatedProductIntoDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Product Updated Successfully",
        data: result,
    });
}));
const categoryProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const filterData = (0, Pick_1.default)(req.query, productConstant_1.petFilterableFields);
    const optionsData = (0, Pick_1.default)(req.query, userConstant_1.optionsPaginationFields);
    const result = yield productService_1.productService.categoryProductFromDB(id, filterData, optionsData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Category Product Successfully",
        data: result,
    });
}));
exports.productController = {
    createProduct,
    allProduct,
    singleProduct,
    deleteProduct,
    updatedProduct,
    categoryProduct,
};
