"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), ".env")) });
exports.default = {
    PORT: process.env.PORT,
    bcryptSalt: process.env.bcryptSalt,
    accessToken: process.env.accessToken,
    accessTokenExpireDate: process.env.accessTokenExpireDate,
    refreshToken: process.env.refreshToken,
    refreshTokenExpireDate: process.env.refreshTokenExpireDate,
    email: process.env.email,
    appPassword: process.env.appPassword,
    cloud: {
        CLOUDENAME: process.env.CLOUDENAME,
        API_KEY: process.env.API_KEY,
        API_SECRET: process.env.API_SECRET,
    },
    ssl: {
        store_id: process.env.STORE_ID,
        store_pass: process.env.STORE_PASS,
        success_url: process.env.SUCCESS_URL,
        cancel_url: process.env.CANCEL_URL,
        fail_url: process.env.FAIL_URL,
        ssl_payment_api: process.env.SSL_PAYMENT_API,
        ssl_validation_api: process.env.SSL_VALIDATION_API,
    },
};
