import { test, expect } from "@playwright/test";

test.describe("Language Toggle", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("#root", { state: "attached" });
  });

  test("should default to RTL (Arabic)", async ({ page }) => {
    const htmlDir = await page.locator("html").getAttribute("dir");

    // The app defaults to Arabic which is RTL
    expect(htmlDir).toBe("rtl");
  });

  test("should toggle language when language button is clicked", async ({ page }) => {
    const initialDir = await page.locator("html").getAttribute("dir");

    // Look for a language toggle button by common patterns
    const langToggle =
      page.getByRole("button", { name: /language|اللغة|english|عربي/i });

    if (await langToggle.isVisible()) {
      await langToggle.click();

      // Wait for the direction to change
      await page.waitForFunction(
        (prevDir) => document.documentElement.dir !== prevDir,
        initialDir,
        { timeout: 5000 }
      );

      const newDir = await page.locator("html").getAttribute("dir");
      expect(newDir).not.toBe(initialDir);
    }
  });

  test("should switch text content when language changes", async ({ page }) => {
    const langToggle =
      page.getByRole("button", { name: /language|اللغة|english|عربي/i });

    if (await langToggle.isVisible()) {
      // Capture some text from the page before toggling
      const bodyTextBefore = await page.locator("body").innerText();

      await langToggle.click();

      // Wait briefly for re-render
      await page.waitForTimeout(500);

      const bodyTextAfter = await page.locator("body").innerText();

      // Text should change after toggling language
      expect(bodyTextAfter).not.toBe(bodyTextBefore);
    }
  });
});
