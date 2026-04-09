import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("logger", () => {
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  const originalConsoleInfo = console.info;

  beforeEach(() => {
    console.error = vi.fn();
    console.warn = vi.fn();
    console.info = vi.fn();
    // Reset module cache to re-evaluate import.meta.env.DEV
    vi.resetModules();
  });

  afterEach(() => {
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
    console.info = originalConsoleInfo;
  });

  it("should call console.error with formatted message in dev mode", async () => {
    // In vitest, import.meta.env.DEV is true by default
    const { logger } = await import("@/lib/logger");
    logger.error("test error", { detail: "info" });
    expect(console.error).toHaveBeenCalledWith("[ERROR] test error", { detail: "info" });
  });

  it("should call console.warn with formatted message in dev mode", async () => {
    const { logger } = await import("@/lib/logger");
    logger.warn("test warning", 42);
    expect(console.warn).toHaveBeenCalledWith("[WARN] test warning", 42);
  });

  it("should call console.info with formatted message in dev mode", async () => {
    const { logger } = await import("@/lib/logger");
    logger.info("test info");
    expect(console.info).toHaveBeenCalledWith("[INFO] test info");
  });

  it("should pass multiple args correctly", async () => {
    const { logger } = await import("@/lib/logger");
    logger.error("msg", "arg1", "arg2", 3);
    expect(console.error).toHaveBeenCalledWith("[ERROR] msg", "arg1", "arg2", 3);
  });
});
