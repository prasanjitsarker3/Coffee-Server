import axios from "axios";
import config from "../../App/config";
import { generateUniqueId } from "./paymentInterface";
import ApiError from "../../App/Error/ApiError";
import httpStatus from "http-status";

export const initialPayment = async (orderData: any) => {
  try {
    const data = {
      store_id: config.ssl.store_id,
      store_passwd: config.ssl.store_pass,
      total_amount: orderData.totalPrice,
      currency: "BDT",
      tran_id: orderData.transactionId,
      success_url: config.ssl.success_url,
      fail_url: config.ssl.fail_url,
      cancel_url: config.ssl.cancel_url,
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "Pathao",
      product_name: "Coffee/Tea.",
      product_category: "Electronic",
      product_profile: "general",
      cus_name: orderData.user.name,
      cus_email: orderData.user.email,
      cus_add1: orderData.address,
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: orderData.contact,
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };

    const response = await axios({
      method: "POST",
      url: config.ssl.ssl_payment_api,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  } catch (err: any) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Payment Error");
  }
};

export const validatePayment = async (payload: any) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${config.ssl.ssl_validation_api}?val_id=${payload.val_id}&store_id=${config.ssl.store_id}&store_passwd=${config.ssl.store_pass}&format=json`,
    });
    return response.data;
  } catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Payment Validation Fail !");
  }
};
