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
exports.validatePayment = exports.initialPayment = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../App/config"));
const ApiError_1 = __importDefault(require("../../App/Error/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const initialPayment = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            store_id: config_1.default.ssl.store_id,
            store_passwd: config_1.default.ssl.store_pass,
            total_amount: orderData.totalPrice,
            currency: "BDT",
            tran_id: orderData.transactionId,
            success_url: config_1.default.ssl.success_url,
            fail_url: config_1.default.ssl.fail_url,
            cancel_url: config_1.default.ssl.cancel_url,
            ipn_url: "http://localhost:3030/ipn",
            shipping_method: "Pathao",
            product_name: "Coffee/Tea.",
            product_category: "Electronic",
            product_profile: "general",
            cus_name: orderData.user.name,
            cus_email: orderData.user.email,
            cus_add1: orderData.address,
            cus_add2: "Dhaka",
            cus_city: "Dhaka",
            cus_state: "Dhaka",
            cus_postcode: "1000",
            cus_country: "Bangladesh",
            cus_phone: orderData.contact,
            cus_fax: "01711111111",
            ship_name: "Customer Name",
            ship_add1: "Dhaka",
            ship_add2: "Dhaka",
            ship_city: "Dhaka",
            ship_state: "Dhaka",
            ship_postcode: 1000,
            ship_country: "Bangladesh",
        };
        const response = yield (0, axios_1.default)({
            method: "POST",
            url: config_1.default.ssl.ssl_payment_api,
            data: data,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        return response.data;
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Payment Error");
    }
});
exports.initialPayment = initialPayment;
const validatePayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, axios_1.default)({
            method: "GET",
            url: `${config_1.default.ssl.ssl_validation_api}?val_id=${payload.val_id}&store_id=${config_1.default.ssl.store_id}&store_passwd=${config_1.default.ssl.store_pass}&format=json`,
        });
        return response.data;
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Payment Validation Fail !");
    }
});
exports.validatePayment = validatePayment;
