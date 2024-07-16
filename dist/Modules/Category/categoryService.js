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
exports.categoryService = void 0;
const Prisma_1 = __importDefault(require("../../App/Common/Prisma"));
const createCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const result = yield Prisma_1.default.category.create({
        data: payload,
    });
    return result;
});
const getAllCategoryDFormDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Prisma_1.default.category.findMany({
        where: {
            isDeleted: false,
        },
    });
    return result;
});
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Prisma_1.default.category.update({
        where: {
            id,
        },
        data: {
            isDeleted: true,
        },
    });
    return result;
});
const updateCategory = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Prisma_1.default.category.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield Prisma_1.default.category.update({
        where: {
            id: data.id,
        },
        data: payload,
    });
    return result;
});
exports.categoryService = {
    createCategory,
    getAllCategoryDFormDB,
    deleteCategory,
    updateCategory,
};
