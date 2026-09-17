import axios, { AxiosError } from "axios";
import { env } from "@/config/env";
import type { ApiResponse } from "@/types/api";

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

function resolveErrorMessage(error: AxiosError<ApiResponse<null>>): string {
  const status = error.response?.status;
  const serverMessage = error.response?.data?.error;

  if (serverMessage) return serverMessage;
  if (status === 404) return "The requested resource was not found.";
  if (status && status >= 500) return "Something went wrong on our end. Please try again.";
  if (error.code === "ECONNABORTED") return "The request timed out. Please try again.";
  if (!error.response) return "Unable to reach the server. Check your connection.";
  return "Something went wrong. Please try again.";
}

export const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiResponse<null>>) => {
    return Promise.reject(
      new ApiRequestError(resolveErrorMessage(error), error.response?.status ?? 0),
    );
  },
);
