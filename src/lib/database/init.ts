import { getDb } from "./db";

// Track the in-flight promise so concurrent callers wait on the same
// initialization and a failed attempt can be retried on next call.
let initPromise: Promise<void> | null = null;

export async function initDb(): Promise<void> {
  if (initPromise) return initPromise;

  initPromise = getDb()
    .then(() => undefined)
    .catch((error) => {
      // Allow retry after a failed initialization attempt
      initPromise = null;
      throw error;
    });

  return initPromise;
}
