import BasePage from './BasePage';
import { Page, Locator } from '@playwright/test';

export default class CatalogPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Search for a product
  async search(term: string) {
    const searchInput = this.page.locator('#small-searchterms');
    await searchInput.fill(term);
    await searchInput.press('Enter');
  }

  // Get all product items
  getResults(): Locator {
    return this.page.locator('.product-item');
  }

  // Apply sorting
  async applySort(option: string) {
    const sortSelect = this.page.locator('select#products-orderby');
    await sortSelect.selectOption({ label: option });
  }

  // Apply a filter
  async applyFilter(filterName: string, value: string) {
    const filterLabel = this.page.locator(`label:has-text("${filterName}")`);
    await filterLabel.click();
    const filterOption = this.page.locator(`label:has-text("${value}")`);
    await filterOption.click();
  }

  // Open a product by name
  async openProduct(productName: string) {
    const productLink = this.page.locator(`.product-item h2:has-text("${productName}") a`);
    await productLink.click();
  }

  // Verify that there are results
  async verifyResults() {
    const resultsCount = await this.getResults().count();
    if (resultsCount === 0) {
      console.log('No products found.');
    } else {
      console.log(`Found ${resultsCount} products.`);
    }
  }
}