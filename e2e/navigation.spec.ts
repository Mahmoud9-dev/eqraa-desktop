import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/HomePage";

test.describe("App Navigation", () => {
  test("should load the home page", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.waitForAppReady();

    await expect(page.locator("#root")).toBeVisible();
  });

  test("should navigate to students page", async ({ page }) => {
    await page.goto("/students");

    await expect(page.locator("#root")).toBeVisible();
    await expect(page).toHaveURL(/\/students/);
  });

  test("should navigate to teachers page", async ({ page }) => {
    await page.goto("/teachers");

    await expect(page.locator("#root")).toBeVisible();
    await expect(page).toHaveURL(/\/teachers/);
  });

  test("should navigate to attendance page", async ({ page }) => {
    await page.goto("/attendance");

    await expect(page.locator("#root")).toBeVisible();
    await expect(page).toHaveURL(/\/attendance/);
  });

  test("should navigate to quran page", async ({ page }) => {
    await page.goto("/quran");

    await expect(page.locator("#root")).toBeVisible();
    await expect(page).toHaveURL(/\/quran/);
  });

  test("should show not found page for invalid route", async ({ page }) => {
    await page.goto("/this-route-does-not-exist");

    await expect(page.locator("#root")).toBeVisible();
  });

  test("should navigate via sidebar links", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("#root", { state: "attached" });

    const studentsLink = page.getByRole("link", { name: /student/i }).first();

    // Fail loudly if navigation is broken; previously the missing link
    // silently passed the test.
    await expect(studentsLink).toBeVisible();
    await studentsLink.click();
    await expect(page).toHaveURL(/\/students/);
  });
});
