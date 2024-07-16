"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryUpdateValidation = exports.categoryValidation = void 0;
const zod_1 = require("zod");
exports.categoryValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required" }),
        icon: zod_1.z.string({ required_error: "Icon is required" }),
    }),
});
exports.categoryUpdateValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        icon: zod_1.z.string().optional(),
    }),
});
