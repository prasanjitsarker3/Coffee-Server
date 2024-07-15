import { OrderStatus, PaymentStatus, PaymentType } from "@prisma/client";
import prisma from "../../App/Common/Prisma";
import { ICashPayment, generateUniqueId } from "./paymentInterface";
import axios from "axios";
import ApiError from "../../App/Error/ApiError";
import httpStatus from "http-status";
import config from "../../App/config";
import { initialPayment, validatePayment } from "./sslContacts";

const cashOnPayment = async (payload: ICashPayment) => {
  const uniqueId = generateUniqueId();
  const result = await prisma.payment.create({
    data: {
      orderId: payload.orderId,
      amount: payload.amount,
      // status: PaymentStatus.UNPAID,
      pay: PaymentType.CASH,
      transactionId: uniqueId,
    },
  });
  return result;
};

const initPayment = async (id: string) => {
  const orderData = await prisma.order.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      user: true,
      payment: true,
    },
  });
  const result = await initialPayment(orderData);
  return {
    paymentUrl: result.GatewayPageURL,
  };
};

const validationPayment = async (payload: any) => {
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
  await prisma.$transaction(async (transactionClient) => {
    const orderData = await transactionClient.order.update({
      where: {
        transactionId: tran_id,
      },
      data: {
        paymentStatus: PaymentStatus.PAID,
      },
    });
    await transactionClient.payment.create({
      data: {
        orderId: orderData.id,
        amount: orderData.totalPrice,
        pay: PaymentType.ONLINE,
        transactionId: orderData.transactionId,
        paymentGatewayData: payload,
      },
    });
  });
  return {
    massage: "Payment Success",
  };
};

const metaData = async () => {
  const totalProduct = await prisma.product.count();
  const totalOrder = await prisma.order.count();
  const totalDelivery = await prisma.order.count({
    where: {
      status: OrderStatus.DELIVERY,
    },
  });
  const totalPending = await prisma.order.count({
    where: {
      status: OrderStatus.INPROGRESS,
    },
  });
  const totalSell = await prisma.order.count({
    where: {
      status: OrderStatus.DELIVERY,
    },
  });
  const totalAmount = await prisma.order.aggregate({
    where: {
      status: OrderStatus.DELIVERY,
    },
    _sum: {
      totalPrice: true,
    },
  });
  const orderClose = await prisma.order.count({
    where: {
      OR: [{ status: OrderStatus.CANCELED }, { isDelete: true }],
    },
  });
  const totalUser = await prisma.user.count();
  const price = await prisma.order.findMany({
    where: {
      status: OrderStatus.DELIVERY,
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
};

const getProductPiaChartData = async () => {
  // Fetch all products and include their categories
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
  });

  // Group products by categoryId and count the number of products per category
  const result = await prisma.product.groupBy({
    by: ["categoryId"],
    _count: {
      id: true,
    },
  });

  // Format the data for the pie chart
  const formattedPieData = result.map((count) => ({
    status: products.find((product) => product.categoryId === count.categoryId)
      ?.category.name,
    count: Number(count._count.id),
  }));
  return formattedPieData;
};

const orderMonthlyMetaData = async () => {
  const orderData = await prisma.order.findMany({
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
  }, {} as Record<string, number>);

  const formattedData = allMonths.map((month) => ({
    month,
    count: orderCounts[month] || 0,
  }));

  console.log(formattedData);
  return formattedData;
};

export const paymentService = {
  cashOnPayment,
  initPayment,
  validationPayment,
  metaData,
  getProductPiaChartData,
  orderMonthlyMetaData,
};
