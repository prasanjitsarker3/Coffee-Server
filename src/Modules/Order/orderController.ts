import { Request, Response } from "express";
import catchAsync from "../../Utilities/catchAsync";

import sendResponse from "../../Utilities/sendResponse";
import httpStatus from "http-status";
import { orderService } from "./orderService";
import pick from "../../App/Common/Pick";
import { optionsPaginationFields } from "../User/userConstant";
import { orderFilterableFields } from "./orderConstant";
import { ITokenUser } from "../../App/Common/authType";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.createOrderIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Order Create Successfully",
    data: result,
  });
});

const allOrder = catchAsync(async (req: Request, res: Response) => {
  const filterData = pick(req.query, orderFilterableFields);
  const optionsData = pick(req.query, optionsPaginationFields);
  const result = await orderService.getAllOrderFormDB(filterData, optionsData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order Fetch Successfully",
    data: result,
  });
});
const allDeliveryOrder = catchAsync(async (req: Request, res: Response) => {
  const filterData = pick(req.query, orderFilterableFields);
  const optionsData = pick(req.query, optionsPaginationFields);
  const result = await orderService.getAllOrderDeliveryFormDB(
    filterData,
    optionsData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order Fetch Successfully",
    data: result,
  });
});
const singleOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await orderService.getSingleOrderFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Order Fetch Successfully",
    data: result,
  });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("Req Body:", req.body);
  const result = await orderService.orderProductStatusUpdate(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order Status Updated Successfully",
    data: result,
  });
});
const orderDeleted = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await orderService.deleteOrderProduct(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order Delete Successfully",
    data: result,
  });
});
const sendMail = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await orderService.sendEmail(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Email Send Successfully",
    data: result,
  });
});

const getUserAllOrder = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const filterData = pick(req.query, orderFilterableFields);
    const optionsData = pick(req.query, optionsPaginationFields);
    const result = await orderService.getUserOrderProduct(
      user,
      filterData,
      optionsData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Order Fetch Successfully",
      data: result,
    });
  }
);

export const orderController = {
  createOrder,
  allOrder,
  singleOrder,
  updateOrderStatus,
  orderDeleted,
  allDeliveryOrder,
  sendMail,
  getUserAllOrder,
};
