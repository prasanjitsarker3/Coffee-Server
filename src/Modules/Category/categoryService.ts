import prisma from "../../App/Common/Prisma";
import { ICategory } from "./categoryIterface";

const createCategory = async (payload: ICategory) => {
  console.log(payload);
  const result = await prisma.category.create({
    data: payload,
  });
  return result;
};

const getAllCategoryDFormDB = async () => {
  const result = await prisma.category.findMany({
    where: {
      isDeleted: false,
    },
  });
  return result;
};

const deleteCategory = async (id: string) => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });
  return result;
};

const updateCategory = async (id: string, payload: any) => {
  const data = await prisma.category.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.category.update({
    where: {
      id: data.id,
    },
    data: payload,
  });
  return result;
};
export const categoryService = {
  createCategory,
  getAllCategoryDFormDB,
  deleteCategory,
  updateCategory,
};
