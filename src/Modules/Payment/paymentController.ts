import { Request, Response } from "express";
import catchAsync from "../../Utilities/catchAsync";
import { paymentService } from "./paymentService";
import sendResponse from "../../Utilities/sendResponse";
import httpStatus from "http-status";

const cashPayment = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.cashOnPayment(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Order Successfully",
    data: result,
  });
});
const initPayment = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const result = await paymentService.initPayment(orderId);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Payment Init Successfully",
    data: result,
  });
});

const validatePayment = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.validationPayment(req.query);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Validate Payment Successfully !",
    data: result,
  });
});

const getMetaData = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.metaData();
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Meta Data Successfully !",
    data: result,
  });
});
const getProductPieData = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.getProductPiaChartData();
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Meta Data Successfully !",
    data: result,
  });
});
const getOrderMonthMetaData = catchAsync(
  async (req: Request, res: Response) => {
    const result = await paymentService.orderMonthlyMetaData();
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Meta Data Successfully !",
      data: result,
    });
  }
);

export const paymentController = {
  cashPayment,
  initPayment,
  validatePayment,
  getMetaData,
  getProductPieData,
  getOrderMonthMetaData,
};
