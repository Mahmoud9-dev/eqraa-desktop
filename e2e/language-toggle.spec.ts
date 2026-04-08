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

    const langToggle = page.getByRole("button", {
      name: /language|اللغة|english|عربي/i,
    });

    // Fail loudly if the toggle is missing — previously this was a
    // silent no-op wrapped in an `if (isVisible())` guard.
    await expect(langToggle).toBeVisible();
    await langToggle.click();

    await page.waitForFunction(
      (prevDir) => document.documentElement.dir !== prevDir,
      initialDir,
      { timeout: 5000 },
    );

    const newDir = await page.locator("html").getAttribute("dir");
    expect(newDir).not.toBe(initialDir);
  });

  test("should switch text content when language changes", async ({ page }) => {
    const langToggle = page.getByRole("button", {
      name: /language|اللغة|english|عربي/i,
    });

    await expect(langToggle).toBeVisible();

    const bodyTextBefore = await page.locator("body").innerText();
    await langToggle.click();

    // Wait until the html dir actually flips instead of a fixed sleep.
    await page.waitForFunction(
      (before) => document.body.innerText !== before,
      bodyTextBefore,
      { timeout: 5000 },
    );

    const bodyTextAfter = await page.locator("body").innerText();
    expect(bodyTextAfter).not.toBe(bodyTextBefore);
  });
});
