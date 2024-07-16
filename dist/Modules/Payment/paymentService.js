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
exports.paymentService = void 0;
const client_1 = require("@prisma/client");
const Prisma_1 = __importDefault(require("../../App/Common/Prisma"));
const paymentInterface_1 = require("./paymentInterface");
const sslContacts_1 = require("./sslContacts");
const cashOnPayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const uniqueId = (0, paymentInterface_1.generateUniqueId)();
    const result = yield Prisma_1.default.payment.create({
        data: {
            orderId: payload.orderId,
            amount: payload.amount,
            // status: PaymentStatus.UNPAID,
            pay: client_1.PaymentType.CASH,
            transactionId: uniqueId,
        },
    });
    return result;
});
const initPayment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const orderData = yield Prisma_1.default.order.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            user: true,
            payment: true,
        },
    });
    const result = yield (0, sslContacts_1.initialPayment)(orderData);
    return {
        paymentUrl: result.GatewayPageURL,
    };
});
const validationPayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // if (!payload || !payload.status || !(payload.status === "VALID")) {
    //   return {
    //     message: "Invalid Payment !",
    //   };
    // }
    // const response = await validatePayment(payload);
    // if (response?.status !== "VALID") {
    //   return {
    //     message: "Payment Failed !",
    //   };
    // }
    // const { tran_id } = result;
    const { tran_id } = payload;
    yield Prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const orderData = yield transactionClient.order.update({
            where: {
                transactionId: tran_id,
            },
            data: {
                paymentStatus: client_1.PaymentStatus.PAID,
            },
        });
        yield transactionClient.payment.create({
            data: {
                orderId: orderData.id,
                amount: orderData.totalPrice,
                pay: client_1.PaymentType.ONLINE,
                transactionId: orderData.transactionId,
                paymentGatewayData: payload,
            },
        });
    }));
    return {
        massage: "Payment Success",
    };
});
const metaData = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalProduct = yield Prisma_1.default.product.count();
    const totalOrder = yield Prisma_1.default.order.count();
    const totalDelivery = yield Prisma_1.default.order.count({
        where: {
            status: client_1.OrderStatus.DELIVERY,
        },
    });
    const totalPending = yield Prisma_1.default.order.count({
        where: {
            status: client_1.OrderStatus.INPROGRESS,
        },
    });
    const totalSell = yield Prisma_1.default.order.count({
        where: {
            status: client_1.OrderStatus.DELIVERY,
        },
    });
    const totalAmount = yield Prisma_1.default.order.aggregate({
        where: {
            status: client_1.OrderStatus.DELIVERY,
        },
        _sum: {
            totalPrice: true,
        },
    });
    const orderClose = yield Prisma_1.default.order.count({
        where: {
            OR: [{ status: client_1.OrderStatus.CANCELED }, { isDelete: true }],
        },
    });
    const totalUser = yield Prisma_1.default.user.count();
    const price = yield Prisma_1.default.order.findMany({
        where: {
            status: client_1.OrderStatus.DELIVERY,
        },
        select: {
            totalPrice: true,
        },
    });
    const result = [
        totalProduct || 0,
        totalOrder || 0,
        totalDelivery || 0,
        totalPending,
        totalSell,
        totalAmount,
        orderClose,
        totalUser,
    ];
    return result;
});
const getProductPiaChartData = () => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch all products and include their categories
    const products = yield Prisma_1.default.product.findMany({
        include: {
            category: true,
        },
    });
    // Group products by categoryId and count the number of products per category
    const result = yield Prisma_1.default.product.groupBy({
        by: ["categoryId"],
        _count: {
            id: true,
        },
    });
    // Format the data for the pie chart
    const formattedPieData = result.map((count) => {
        var _a;
        return ({
            status: (_a = products.find((product) => product.categoryId === count.categoryId)) === null || _a === void 0 ? void 0 : _a.category.name,
            count: Number(count._count.id),
        });
    });
    return formattedPieData;
});
const orderMonthlyMetaData = () => __awaiter(void 0, void 0, void 0, function* () {
    const orderData = yield Prisma_1.default.order.findMany({
        select: {
            createdAt: true,
        },
    });
    const allMonths = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const orderCounts = orderData.reduce((acc, { createdAt }) => {
        const month = new Date(createdAt).toLocaleString("default", {
            month: "short",
        });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {});
    const formattedData = allMonths.map((month) => ({
        month,
        count: orderCounts[month] || 0,
    }));
    console.log(formattedData);
    return formattedData;
});
exports.paymentService = {
    cashOnPayment,
    initPayment,
    validationPayment,
    metaData,
    getProductPiaChartData,
    orderMonthlyMetaData,
};
