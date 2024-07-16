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
exports.orderService = void 0;
const client_1 = require("@prisma/client");
const Prisma_1 = __importDefault(require("../../App/Common/Prisma"));
const paginationCalculation_1 = __importDefault(require("../../Utilities/paginationCalculation"));
const orderConstant_1 = require("./orderConstant");
const paymentInterface_1 = require("../Payment/paymentInterface");
const emailSender_1 = __importDefault(require("../../Utilities/emailSender"));
const createOrderIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const uniqueId = (0, paymentInterface_1.generateUniqueId)();
    const result = yield Prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield tx.order.create({
            data: {
                address: payload.address,
                contact: payload.contact,
                totalPrice: payload.totalPrice,
                transactionId: uniqueId,
                user: {
                    connect: { id: payload.userId },
                },
                products: {
                    create: payload.products.map((product) => ({
                        quantity: product.quantity,
                        size: product.size,
                        product: {
                            connect: { id: product.productId },
                        },
                    })),
                },
            },
        });
        yield Promise.all(payload.products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            yield tx.product.update({
                where: {
                    id: product.productId,
                },
                data: {
                    sellCount: {
                        increment: product.quantity,
                    },
                },
            });
        })));
        return order;
    }));
    return result;
});
const getAllOrderFormDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationCalculation_1.default)(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andCondition = [];
    // Add search conditions
    if (searchTerm) {
        andCondition.push({
            OR: orderConstant_1.orderSearchingField.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
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
        status: client_1.OrderStatus.INPROGRESS,
    });
    andCondition.push({
        isDelete: false,
    });
    const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};
    const result = yield Prisma_1.default.order.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "asc" },
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                },
            },
            products: {
                select: {
                    quantity: true,
                    size: true,
                    product: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
            payment: true,
        },
    });
    const total = yield Prisma_1.default.order.count({ where: whereCondition });
    return {
        meta: {
            page,
            limit,
            total,
        },
        result,
    };
});
const getAllOrderDeliveryFormDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationCalculation_1.default)(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andCondition = [];
    // Add search conditions
    if (searchTerm) {
        andCondition.push({
            OR: orderConstant_1.orderSearchingField.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
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
        OR: [{ status: client_1.OrderStatus.COMFIRM }, { status: client_1.OrderStatus.DELIVERY }],
    });
    andCondition.push({
        isDelete: false,
    });
    const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};
    const result = yield Prisma_1.default.order.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "asc" },
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                },
            },
            products: {
                select: {
                    quantity: true,
                    size: true,
                    product: {
                        select: {
                            name: true,
                            price: true,
                            discountPrice: true,
                        },
                    },
                },
            },
            payment: true,
        },
    });
    const total = yield Prisma_1.default.order.count({ where: whereCondition });
    return {
        meta: {
            page,
            limit,
            total,
        },
        result,
    };
});
const getUserOrderProduct = (user, params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationCalculation_1.default)(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andCondition = [];
    console.log("User", user);
    // Add search conditions
    if (searchTerm) {
        andCondition.push({
            OR: orderConstant_1.orderSearchingField.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
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
        user: {
            email: user.email,
        },
    });
    andCondition.push({
        isDelete: false,
    });
    const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};
    const result = yield Prisma_1.default.order.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "asc" },
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                },
            },
            products: {
                select: {
                    quantity: true,
                    size: true,
                    product: {
                        select: {
                            name: true,
                            price: true,
                        },
                    },
                },
            },
            payment: true,
        },
    });
    const total = yield Prisma_1.default.order.count({ where: whereCondition });
    return {
        meta: {
            page,
            limit,
            total,
        },
        result,
    };
});
const getSingleOrderFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Prisma_1.default.order.findUniqueOrThrow({
        where: {
            id: id,
        },
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                },
            },
            products: {
                select: {
                    quantity: true,
                    size: true,
                    product: {
                        select: {
                            name: true,
                            price: true,
                        },
                    },
                },
            },
            payment: true,
        },
    });
    return data;
});
const orderProductStatusUpdate = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ID:", id);
    console.log("Check Status:", status);
    // Find the order by id
    const product = yield Prisma_1.default.order.findUniqueOrThrow({
        where: {
            id,
        },
    });
    // Update the order status
    const updateOrder = yield Prisma_1.default.order.update({
        where: {
            id: product.id,
        },
        //@ts-ignore
        data: status,
    });
    console.log(updateOrder);
    return updateOrder;
});
const deleteOrderProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Prisma_1.default.order.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield Prisma_1.default.order.update({
        where: {
            id: product.id,
        },
        data: {
            isDelete: true,
        },
    });
    console.log(result);
    return result;
});
const sendEmail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const deliveryData = yield Prisma_1.default.order.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                },
            },
            products: {
                select: {
                    quantity: true,
                    size: true,
                    product: {
                        select: {
                            name: true,
                            price: true,
                        },
                    },
                },
            },
            payment: true,
        },
    });
    const email = (_a = deliveryData === null || deliveryData === void 0 ? void 0 : deliveryData.user) === null || _a === void 0 ? void 0 : _a.email;
    const html = `
    <div>
      <h1>Hello ${deliveryData.user.name},</h1>
      <p>Your order details:</p>
      <ul>
        ${deliveryData.products
        .map((item) => `<li>${item.product.name} - ${item.quantity} x ${item.size} @ $${item.product.price}</li>`)
        .join("")}
      </ul>
      <p>Total Payment: $${(_b = deliveryData === null || deliveryData === void 0 ? void 0 : deliveryData.payment) === null || _b === void 0 ? void 0 : _b.amount}</p>
    </div>
  `;
    yield (0, emailSender_1.default)(email, html);
    const result = yield Prisma_1.default.order.update({
        where: {
            id: deliveryData.id,
        },
        data: {
            status: "DELIVERY",
        },
    });
    return result;
});
exports.orderService = {
    createOrderIntoDB,
    getAllOrderFormDB,
    getSingleOrderFromDB,
    orderProductStatusUpdate,
    deleteOrderProduct,
    getAllOrderDeliveryFormDB,
    sendEmail,
    getUserOrderProduct,
};
