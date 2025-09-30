import BasePage from './BasePage';
import { Page, Locator } from '@playwright/test';

export default class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Get the product title
  getTitle(): Locator {
    return this.page.locator('h1.product-title');
  }

  // Get the product price
  getPrice(): Locator {
    return this.page.locator('.product-price');
  }

  // Add the product to cart
  async addToCart(quantity: number = 1): Promise<void> {
    const qtyInput = this.page.locator('#product_enteredQuantity_1');
    const addBtn = this.page.locator('#add-to-cart-button-1');
    await qtyInput.fill(quantity.toString());
    await addBtn.click();
  }
}
