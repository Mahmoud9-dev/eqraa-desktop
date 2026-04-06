import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  async navigate() {
    await super.navigate("/");
  }

  async getStatCards() {
    return this.page.locator("[data-testid='stat-card']").all();
  }
}
