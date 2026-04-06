import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initDb } from "./lib/database/init";
import { logger } from "@/lib/logger";

(async () => {
  try {
    await initDb();
  } catch (error) {
    logger.error("Failed to initialize the database:", error);
  }
  createRoot(document.getElementById("root")!).render(<App />);
})();
