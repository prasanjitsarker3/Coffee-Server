"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productUpdatedValidationSchema = exports.productCreateValidationSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.productCreateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required" }),
        image: zod_1.z.string({ required_error: "Image is required" }),
        description: zod_1.z.string({ required_error: "Description is required" }),
        price: zod_1.z.number({ required_error: "Price is required" }),
        size: zod_1.z
            .array(zod_1.z.string())
            .nonempty({ message: "Size array cannot be empty" }),
        discount: zod_1.z.number().optional(),
        buyPackage: zod_1.z.enum([client_1.Package.Bag, client_1.Package.Box, client_1.Package.Tin], {
            required_error: "Package is required",
        }),
        location: zod_1.z.string({ required_error: "Location is required" }),
        isSpecial: zod_1.z.enum([client_1.Special.Tea, client_1.Special.Coffee], {
            required_error: "Special is required",
        }),
        categoryId: zod_1.z.string({ required_error: "Category is required" }),
    }),
});
exports.productUpdatedValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        size: zod_1.z
            .array(zod_1.z.string())
            .nonempty({ message: "Size array cannot be empty" })
            .optional(),
        discount: zod_1.z.number().optional(),
        buyPackage: zod_1.z.enum([client_1.Package.Bag, client_1.Package.Box, client_1.Package.Tin]).optional(),
        location: zod_1.z.string().optional(),
        isSpecial: zod_1.z.enum([client_1.Special.Tea, client_1.Special.Coffee]).optional(),
        categoryId: zod_1.z.string().optional(),
    }),
});
