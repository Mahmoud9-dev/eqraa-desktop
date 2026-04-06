import { Page } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(path: string) {
    await this.page.goto(path);
  }

  async getPageTitle() {
    return this.page.title();
  }

  async waitForAppReady() {
    await this.page.waitForSelector("#root", { state: "attached" });
  }
}
