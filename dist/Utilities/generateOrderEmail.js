"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOrderEmail = void 0;
const generateOrderEmail = (deliveryData) => `
  <div style="border: 2px solid #CBD5E0; padding: 12px 16px;">
    <h1 style="text-align: center; font-size: 2xl;">The Daily Cup of Tea & Coffee</h1>
    <h2 style="font-size: 1.5rem; font-weight: 600;">Order Details</h2>
    <div style="margin-top: 8px; line-height: 1.5;">
      <p>Name: ${deliveryData.user.name}</p>
      <p>Email: ${deliveryData.user.email}</p>
      <p>Contact: ${deliveryData.contact}</p>
      <p>Address: ${deliveryData.address}</p>
    </div>
    <div style="margin-top: 8px;">
      ${deliveryData.products
    .map((productItem) => `
        <div style="display: flex; align-items: center; gap: 12px; margin-top: 8px;">
          <div style="display: flex; align-items: center; gap: 5px;">
            <p>${productItem.product.name}</p>
            <p>${productItem.size}</p>
            <p>Q: ${productItem.quantity}</p>
          </div>
          <div>
            <p>$${productItem.product.price}</p>
          </div>
        </div>
      `)
    .join("")}
    </div>
    ${deliveryData.payment
    ? `
      <div style="margin-top: 8px; line-height: 1.5;">
        <p>Payment: ${deliveryData.payment.pay}</p>
        <p>Transaction: ${deliveryData.payment.transactionId}</p>
      </div>
    `
    : ""}
    <div style="margin-top: 8px; border-bottom: 1px solid #E2E8F0; padding: 12px 0;"></div>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h2 style="font-size: 1rem; font-weight: 600;">Total Price</h2>
      <p>$${deliveryData.totalPrice}</p>
    </div>
  </div>
`;
exports.generateOrderEmail = generateOrderEmail;
