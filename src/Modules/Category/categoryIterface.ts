import { z } from "zod";

export type ICategory = {
  name: string;
  icon: string;
};

export const categoryValidation = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    icon: z.string({ required_error: "Icon is required" }),
  }),
});
export const categoryUpdateValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    icon: z.string().optional(),
  }),
});
