export type ICashPayment = {
  orderId: string;
  amount: number;
  transactionId?: string;
};

export function generateUniqueId() {
  return "id-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}
