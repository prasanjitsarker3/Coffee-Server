import { Package, Special } from "@prisma/client";
import { z } from "zod";

export const productCreateValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    image: z.string({ required_error: "Image is required" }),
    description: z.string({ required_error: "Description is required" }),
    price: z.number({ required_error: "Price is required" }),
    size: z
      .array(z.string())
      .nonempty({ message: "Size array cannot be empty" }),
    discount: z.number().optional(),
    buyPackage: z.enum([Package.Bag, Package.Box, Package.Tin], {
      required_error: "Package is required",
    }),
    location: z.string({ required_error: "Location is required" }),
    isSpecial: z.enum([Special.Tea, Special.Coffee], {
      required_error: "Special is required",
    }),
    categoryId: z.string({ required_error: "Category is required" }),
  }),
});

export const productUpdatedValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    size: z
      .array(z.string())
      .nonempty({ message: "Size array cannot be empty" })
      .optional(),
    discount: z.number().optional(),
    buyPackage: z.enum([Package.Bag, Package.Box, Package.Tin]).optional(),
    location: z.string().optional(),
    isSpecial: z.enum([Special.Tea, Special.Coffee]).optional(),
    categoryId: z.string().optional(),
  }),
});
