export async function withTiming<T>(
  label: string,
  fn: () => Promise<T>,
): Promise<T> {
  if (process.env.NODE_ENV === "production") return fn();

  const start = performance.now();
  try {
    return await fn();
  } finally {
    const durationMs = (performance.now() - start).toFixed(1);
    console.debug(`[api] ${label} — ${durationMs}ms`);
  }
}
