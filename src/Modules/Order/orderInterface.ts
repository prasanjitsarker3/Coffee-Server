export type IOProduct = {
  productId: string;
  quantity: number;
  size: string;
};

export type IOrder = {
  userId: string;
  contact: string;
  address: string;
  totalPrice: number;
  products: IOProduct[];
};
