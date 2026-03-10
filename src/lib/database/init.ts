import { getDb } from "./db";
import { seedDemoData } from "./seed";

let initialized = false;

export async function initDb(): Promise<void> {
  if (initialized) return;
  initialized = true;
  await getDb();
  await seedDemoData();
}
