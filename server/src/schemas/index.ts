import { z } from "zod";

export const stringAsNumber = () => {
  return z
    .string()
    .min(1)
    .refine((v) => {
      if (!Number.isNaN(+v) && typeof +v === "number" && +v >= 0) return true;
    }, "Query param must be a number.");
};