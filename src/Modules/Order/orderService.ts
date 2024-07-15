import { OrderStatus, Prisma } from "@prisma/client";
import prisma from "../../App/Common/Prisma";
import paginationCalculation from "../../Utilities/paginationCalculation";
import { IPaginationOptions } from "../Products/productConstant";
import { IOrder } from "./orderInterface";
import { orderSearchingField } from "./orderConstant";
import { generateUniqueId } from "../Payment/paymentInterface";
import ApiError from "../../App/Error/ApiError";
import httpStatus from "http-status";
import { generateOrderEmail } from "../../Utilities/generateOrderEmail";
import emailSender from "../../Utilities/emailSender";
import { ITokenUser } from "../../App/Common/authType";

const createOrderIntoDB = async (payload: IOrder) => {
  const uniqueId = generateUniqueId();
  const result = await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
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

    await Promise.all(
      payload.products.map(async (product) => {
        await tx.product.update({
          where: {
            id: product.productId,
          },
          data: {
            sellCount: {
              increment: product.quantity,
            },
          },
        });
      })
    );

    return order;
  });

  return result;
};

const getAllOrderFormDB = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationCalculation(options);

  const { searchTerm, ...filterData } = params;
  const andCondition: Prisma.OrderWhereInput[] = [];

  // Add search conditions
  if (searchTerm) {
    andCondition.push({
      OR: orderSearchingField.map((field) => ({
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
    status: OrderStatus.INPROGRESS,
  });

  andCondition.push({
    isDelete: false,
  });
  const whereCondition: Prisma.OrderWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.order.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "asc" },
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

  const total = await prisma.order.count({ where: whereCondition });

  return {
    meta: {
      page,
      limit,
      total,
    },
    result,
  };
};
const getAllOrderDeliveryFormDB = async (
  params: any,
  options: IPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationCalculation(options);

  const { searchTerm, ...filterData } = params;
  const andCondition: Prisma.OrderWhereInput[] = [];

  // Add search conditions
  if (searchTerm) {
    andCondition.push({
      OR: orderSearchingField.map((field) => ({
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
    OR: [{ status: OrderStatus.COMFIRM }, { status: OrderStatus.DELIVERY }],
  });
  andCondition.push({
    isDelete: false,
  });
  const whereCondition: Prisma.OrderWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.order.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "asc" },
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

  const total = await prisma.order.count({ where: whereCondition });

  return {
    meta: {
      page,
      limit,
      total,
    },
    result,
  };
};

const getUserOrderProduct = async (
  user: any,
  params: any,
  options: IPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationCalculation(options);

  const { searchTerm, ...filterData } = params;
  const andCondition: Prisma.OrderWhereInput[] = [];
  console.log("User", user);
  // Add search conditions
  if (searchTerm) {
    andCondition.push({
      OR: orderSearchingField.map((field) => ({
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
  const whereCondition: Prisma.OrderWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.order.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "asc" },
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

  const total = await prisma.order.count({ where: whereCondition });

  return {
    meta: {
      page,
      limit,
      total,
    },
    result,
  };
};
const getSingleOrderFromDB = async (id: string) => {
  const data = await prisma.order.findUniqueOrThrow({
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
};

const orderProductStatusUpdate = async (id: string, status: OrderStatus) => {
  console.log("ID:", id);
  console.log("Check Status:", status);

  // Find the order by id
  const product = await prisma.order.findUniqueOrThrow({
    where: {
      id,
    },
  });

  // Update the order status
  const updateOrder = await prisma.order.update({
    where: {
      id: product.id,
    },
    //@ts-ignore
    data: status,
  });
  console.log(updateOrder);
  return updateOrder;
};

const deleteOrderProduct = async (id: string) => {
  const product = await prisma.order.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.order.update({
    where: {
      id: product.id,
    },
    data: {
      isDelete: true,
    },
  });
  console.log(result);
  return result;
};

const sendEmail = async (id: string) => {
  const deliveryData = await prisma.order.findUniqueOrThrow({
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
  const email = deliveryData?.user?.email;
  const html = `
    <div>
      <h1>Hello ${deliveryData.user.name},</h1>
      <p>Your order details:</p>
      <ul>
        ${deliveryData.products
          .map(
            (item) =>
              `<li>${item.product.name} - ${item.quantity} x ${item.size} @ $${item.product.price}</li>`
          )
          .join("")}
      </ul>
      <p>Total Payment: $${deliveryData?.payment?.amount}</p>
    </div>
  `;

  await emailSender(email, html);
  const result = await prisma.order.update({
    where: {
      id: deliveryData.id,
    },
    data: {
      status: "DELIVERY",
    },
  });
  return result;
};

export const orderService = {
  createOrderIntoDB,
  getAllOrderFormDB,
  getSingleOrderFromDB,
  orderProductStatusUpdate,
  deleteOrderProduct,
  getAllOrderDeliveryFormDB,
  sendEmail,
  getUserOrderProduct,
};
