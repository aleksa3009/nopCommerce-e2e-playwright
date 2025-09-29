import { Page, Locator, expect } from '@playwright/test';

export default class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigate to a path (relative or absolute)
  async goto(path = '/') {
    await this.page.goto(path);
  }

  // Helper for locating elements by role
  // Use string literal union in test code for type safety
  getByRole(role: string, name?: string): Locator {
    return name ? this.page.getByRole(role as any, { name }) : this.page.getByRole(role as any);
  }

  // Click helper
  async click(locator: Locator) {
    await locator.click();
  }

  // Fill input helper
  async fill(locator: Locator, value: string) {
    await locator.fill(value);
  }

  // Get text content of Locator
  async text(locator: Locator) {
    return await locator.textContent();
  }

  // Expect element to be visible
  async expectVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }
}
