import { AxiosError } from "axios";
import { ZodError } from "zod";

export const getErrorMessage = (error: unknown): string => {
  const defaultError = "Unknown error";
  if (error instanceof AxiosError) {
    const errorMessage = error.message;
    const responseError = error.response?.data.error;
    return responseError || errorMessage;
  }
  if (error instanceof ZodError) {
    return error.issues[0].message;
  }
  if (error instanceof Error) {
    return error.message || defaultError;
  }

  return defaultError;
};
