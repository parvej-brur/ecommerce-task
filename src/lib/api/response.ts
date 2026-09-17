import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api";
import { ApiError } from "@/lib/api/errors";

const DEFAULT_CACHE_CONTROL = "public, max-age=3600, stale-while-revalidate=59";

export function apiSuccess<T>(
  data: T,
  init?: { statusCode?: number; cacheControl?: string | false },
): NextResponse<ApiResponse<T>> {
  const statusCode = init?.statusCode ?? 200;
  const body: ApiResponse<T> = { data, success: true, statusCode };

  const headers = new Headers();
  const cacheControl = init?.cacheControl ?? DEFAULT_CACHE_CONTROL;
  if (cacheControl) headers.set("Cache-Control", cacheControl);

  return NextResponse.json(body, { status: statusCode, headers });
}

export function apiError(error: unknown): NextResponse<ApiResponse<null>> {
  const statusCode = error instanceof ApiError ? error.statusCode : 500;
  const message =
    error instanceof ApiError ? error.message : "An unexpected error occurred";

  const body: ApiResponse<null> = {
    data: null,
    success: false,
    error: message,
    statusCode,
  };

  return NextResponse.json(body, { status: statusCode });
}
