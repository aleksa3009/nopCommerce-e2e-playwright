import BasePage from './BasePage';
import { Page, Locator } from '@playwright/test';

export default class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly subtotalLocator: Locator;
  readonly updateCartBtn: Locator;
  readonly checkoutBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('table.cart tbody tr');
    this.subtotalLocator = page.locator('.cart-total .order-total strong');
    this.updateCartBtn = page.getByRole('button', { name: 'Update shopping cart' });
    this.checkoutBtn = page.getByRole('button', { name: 'Checkout' });
  }

  async gotoCart() {
    await this.goto('/cart');
    await this.page.waitForLoadState('networkidle');
  }

  async getItemsCount(): Promise<number> {
    return this.cartItems.count();
  }

  async getItemRowByName(name: string): Promise<Locator> {
    return this.cartItems.filter({ hasText: name }).first();
  }

  async updateQuantity(productName: string, quantity: number) {
    const row = await this.getItemRowByName(productName);
    const qtyInput = row.locator('input.qty-input');
    await qtyInput.fill(String(quantity));
    await this.updateCartBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async removeItem(productName: string) {
    const row = await this.getItemRowByName(productName);
    const removeBtn = row.locator('button.remove-btn, input.remove-from-cart');
    await removeBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getSubtotal(): Promise<string> {
    return (await this.subtotalLocator.textContent())?.trim() ?? '';
  }

  async proceedToCheckout() {
    await this.checkoutBtn.click();
    await this.page.waitForLoadState('networkidle');
  }
}