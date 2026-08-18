import type { Response } from "express";

export interface ApiResponse<T = unknown> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: unknown;
}

export function sendSuccess<T>(
  res: Response,
  message: string,
  data: T,
  statusCode = 200
): Response<ApiResponse<T>> {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export function sendError(
  res: Response,
  error: unknown,
  defaultStatusCode = 400
): Response<ApiErrorResponse> {
  const statusCode =
    typeof error === "object" && error !== null && "statusCode" in error
      ? Number((error as { statusCode: number }).statusCode)
      : defaultStatusCode;

  const message =
    error instanceof Error ? error.message : "An unexpected error occurred.";

  return res.status(statusCode || defaultStatusCode).json({
    success: false,
    message,
  });
}