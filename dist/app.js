"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./Routes/routes"));
const globalErrorHandler_1 = __importDefault(require("./Middleware/globalErrorHandler"));
const notFound_1 = __importDefault(require("./Middleware/notFound"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "https://tea-client.vercel.app", credentials: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send({
        Message: "Tea Server",
    });
});
app.use("/api/v1", routes_1.default);
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
