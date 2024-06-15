import { Request, Response } from "express";
import catchAsync from "../../Utilities/catchAsync";
import sendResponse from "../../Utilities/sendResponse";
import { categoryService } from "./categoryService";
import httpStatus from "http-status";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.createCategory(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Category Create Successfully",
    data: result,
  });
});
const allCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.getAllCategoryDFormDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Fetch Category Successfully",
    data: result,
  });
});
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await categoryService.deleteCategory(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delete Category Successfully",
    data: result,
  });
});
const updatedCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await categoryService.updateCategory(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Update Category Successfully",
    data: result,
  });
});

export const categoryController = {
  createCategory,
  allCategory,
  deleteCategory,
  updatedCategory,
};
