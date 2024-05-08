import { z } from "zod";
//validar req params, req query params
export const createTaskSchema = z.object({
  title: z.string({
    required_error: "title is required",
  }),
  description: z
    .string({
      required_error: "description is required",
    }),
  date: z.string().datetime().optional(),
});
