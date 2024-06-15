import httpStatus from "http-status";
import prisma from "../../App/Common/Prisma";
import ApiError from "../../App/Error/ApiError";
import { IProduct, IProductUP } from "./productInterface";
import { IPaginationOptions, petSearchingField } from "./productConstant";
import paginationCalculation from "../../Utilities/paginationCalculation";
import { Prisma } from "@prisma/client";

const createProductDB = async (payload: IProduct) => {
  if (payload.discount !== undefined) {
    payload.discountPrice = payload.price * (1 - payload.discount / 100);
  } else {
    payload.discountPrice = payload.price;
  }
  const category = await prisma.category.findUniqueOrThrow({
    where: {
      id: payload.categoryId,
    },
  });
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found!");
  }
  const result = await prisma.product.create({
    //@ts-ignore
    data: payload,
  });

  return result;
};

const getAllProductFromDB = async (
  params: any,
  options: IPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationCalculation(options);

  const { searchTerm, ...filterData } = params;
  const andCondition: Prisma.ProductWhereInput[] = [];

  // Add search conditions
  if (searchTerm) {
    andCondition.push({
      OR: petSearchingField.map((field) => ({
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

  const whereCondition: Prisma.ProductWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  // Fetch data from the database
  const result = await prisma.product.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "asc" },
  });

  // Fetch the total count of records
  const total = await prisma.product.count({ where: whereCondition });

  return {
    meta: {
      page,
      limit,
      total,
    },
    result,
  };
};

const singleProductFromDB = async (id: string) => {
  const data = await prisma.product.findUniqueOrThrow({
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
};

const deleteProductFromDB = async (id: string) => {
  const data = await prisma.product.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.product.update({
    where: {
      id: data.id,
    },
    data: {
      isDelete: true,
    },
  });
  return result;
};

const updatedProductIntoDB = async (id: string, payload: any) => {
  console.log(payload);
  const data = await prisma.product.findUniqueOrThrow({
    where: {
      id,
    },
  });

  if (payload.discount) {
    payload.discountPrice = payload.price! * (1 - payload.discount / 100);
  } else {
    payload.discountPrice = payload.price;
  }

  const category = await prisma.category.findUniqueOrThrow({
    where: {
      id: payload.categoryId,
    },
  });
  console.log({ category });
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found!");
  }
  const result = await prisma.product.update({
    where: {
      id: data.id,
    },
    //@ts-ignore
    data: payload,
  });
  return result;
};
export const productService = {
  createProductDB,
  getAllProductFromDB,
  deleteProductFromDB,
  updatedProductIntoDB,
  singleProductFromDB,
};
