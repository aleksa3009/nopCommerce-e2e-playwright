import BasePage from './BasePage';
import { Page, Locator } from '@playwright/test';

export default class HomePage extends BasePage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = this.page.locator('#small-searchterms');
    this.searchButton = this.page.locator('button[type="submit"][class*="search-box-button"]');
  }

  // Perform product search by typing and pressing Enter
  async search(term: string) {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }

  // Optional: click the search button
  async clickSearch() {
    await this.searchButton.click();
  }
}
