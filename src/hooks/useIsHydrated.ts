"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * True once the client has hydrated. Server and first client render both
 * return false, so consumers reading client-only state (e.g. localStorage-backed
 * Zustand stores) can defer that read without triggering a hydration mismatch.
 */
export function useIsHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
