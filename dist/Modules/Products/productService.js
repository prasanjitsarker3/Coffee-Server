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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const Prisma_1 = __importDefault(require("../../App/Common/Prisma"));
const ApiError_1 = __importDefault(require("../../App/Error/ApiError"));
const productConstant_1 = require("./productConstant");
const paginationCalculation_1 = __importDefault(require("../../Utilities/paginationCalculation"));
const createProductDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.discount !== undefined) {
        payload.discountPrice = payload.price * (1 - payload.discount / 100);
    }
    else {
        payload.discountPrice = payload.price;
    }
    const category = yield Prisma_1.default.category.findUniqueOrThrow({
        where: {
            id: payload.categoryId,
        },
    });
    if (!category) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Category not found!");
    }
    const result = yield Prisma_1.default.product.create({
        //@ts-ignore
        data: payload,
    });
    return result;
});
const getAllProductFromDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationCalculation_1.default)(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andCondition = [];
    // Add search conditions
    if (searchTerm) {
        andCondition.push({
            OR: productConstant_1.petSearchingField.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    // Add filter conditions
    if (Object.keys(filterData).length > 0) {
        andCondition.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    andCondition.push({
        isDelete: false,
    });
    const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};
    // Fetch data from the database
    const result = yield Prisma_1.default.product.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "asc" },
    });
    // Fetch the total count of records
    const total = yield Prisma_1.default.product.count({ where: whereCondition });
    return {
        meta: {
            page,
            limit,
            total,
        },
        result,
    };
});
const singleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Prisma_1.default.product.findUniqueOrThrow({
        where: {
            id,
            isDelete: false,
        },
        include: {
            category: {
                select: {
                    name: true,
                },
            },
        },
    });
    return data;
});
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Prisma_1.default.product.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield Prisma_1.default.product.update({
        where: {
            id: data.id,
        },
        data: {
            isDelete: true,
        },
    });
    return result;
});
const updatedProductIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const data = yield Prisma_1.default.product.findUniqueOrThrow({
        where: {
            id,
        },
    });
    if (payload.discount) {
        payload.discountPrice = payload.price * (1 - payload.discount / 100);
    }
    else {
        payload.discountPrice = payload.price;
    }
    const category = yield Prisma_1.default.category.findUniqueOrThrow({
        where: {
            id: payload.categoryId,
        },
    });
    console.log({ category });
    if (!category) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Category not found!");
    }
    const result = yield Prisma_1.default.product.update({
        where: {
            id: data.id,
        },
        //@ts-ignore
        data: payload,
    });
    return result;
});
const categoryProductFromDB = (id, params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationCalculation_1.default)(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andCondition = [];
    // Add search conditions
    if (searchTerm) {
        andCondition.push({
            OR: productConstant_1.petSearchingField.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    // Add filter conditions
    if (Object.keys(filterData).length > 0) {
        andCondition.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    andCondition.push({
        isDelete: false,
        categoryId: id,
    });
    const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};
    // Fetch data from the database
    const result = yield Prisma_1.default.product.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "asc" },
    });
    // Fetch the total count of records
    const total = yield Prisma_1.default.product.count({ where: whereCondition });
    return {
        meta: {
            page,
            limit,
            total,
        },
        result,
    };
});
exports.productService = {
    createProductDB,
    getAllProductFromDB,
    deleteProductFromDB,
    updatedProductIntoDB,
    singleProductFromDB,
    categoryProductFromDB,
};
