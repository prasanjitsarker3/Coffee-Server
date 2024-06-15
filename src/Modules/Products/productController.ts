import { Request, Response } from "express";
import catchAsync from "../../Utilities/catchAsync";
import { productService } from "./productService";
import sendResponse from "../../Utilities/sendResponse";
import httpStatus from "http-status";
import pick from "../../App/Common/Pick";
import { petFilterableFields } from "./productConstant";
import { optionsPaginationFields } from "../User/userConstant";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await productService.createProductDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Product Create Successfully",
    data: result,
  });
});
const allProduct = catchAsync(async (req: Request, res: Response) => {
  const filterData = pick(req.query, petFilterableFields);
  const optionsData = pick(req.query, optionsPaginationFields);
  const result = await productService.getAllProductFromDB(
    filterData,
    optionsData
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product Get Successfully",
    data: result,
  });
});
const singleProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await productService.singleProductFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Fetch Single Product Successfully",
    data: result,
  });
});
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await productService.deleteProductFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delete Product Successfully",
    data: result,
  });
});

const updatedProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("Id", id);
  console.log("Body", req.body);
  const result = await productService.updatedProductIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Product Updated Successfully",
    data: result,
  });
});

export const productController = {
  createProduct,
  allProduct,
  singleProduct,
  deleteProduct,
  updatedProduct,
};
