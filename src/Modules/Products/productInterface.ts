import { Category } from "@prisma/client";

export type IProduct = {
  name: string;
  image: string;
  description: string;
  price: number;
  size: string[];
  discount?: number;
  discountPrice?: number;
  buyPackage?: "Box" | "Bag" | "Tin";
  packageDate: Date;
  location: string;
  expiryDate: Date;
  sellCount: number;
  isSpecial?: "Tea" | "Coffee";
  isDelete: boolean;
  categoryId: string;
  category: Category;
};
export type IProductUP = {
  name?: string;
  image?: string;
  description?: string;
  price?: number;
  size?: string[];
  discount?: number;
  discountPrice?: number;
  buyPackage?: "Box" | "Bag" | "Tin";
  packageDate?: Date;
  location?: string;
  expiryDate?: Date;
  sellCount?: number;
  isSpecial?: "Tea" | "Coffee";
  isDelete?: boolean;
  categoryId?: string;
  category?: Category;
};
