import BasePage from './BasePage';
import { Page, Locator } from '@playwright/test';

export default class ProfilePage extends BasePage {
  readonly ordersLink: Locator;
  readonly accountForm: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    // Links and form selectors with fallbacks
    this.ordersLink = page.getByRole('link', { name: /Orders|Order history/i });
    this.accountForm = page.locator('form#customer-info-form, form.customer-info');
    this.successMessage = page.locator(
      'text=The account has been updated, text=Account details have been updated, .result'
    );
  }

  // Navigate to account info page
  async gotoAccount() {
    await this.goto('/customer/info');
    await this.page.waitForLoadState('networkidle');
  }

  // Get current first name value
  async getFirstName(): Promise<string> {
    return await this.page.getByLabel('First name').inputValue();
  }

  // Get current last name value
  async getLastName(): Promise<string> {
    return await this.page.getByLabel('Last name').inputValue();
  }

  // Update first and last name, then save
  async updateName(firstName: string, lastName: string) {
    await this.page.getByLabel('First name').fill(firstName);
    await this.page.getByLabel('Last name').fill(lastName);
    await this.page.getByRole('button', { name: /Save|Save info|Update/i }).first().click();
    await this.page.waitForLoadState('networkidle');
  }

  // Open order history page
  async viewOrderHistory() {
    await this.ordersLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Count order items in order history
  async getOrderItemsCount(): Promise<number> {
    const items = this.page.locator('.order-list .order-item, .order-list tr, .order');
    return await items.count();
  }

  // Assert that profile update message is visible
  async expectUpdated() {
    await this.successMessage.first().waitFor({ state: 'visible', timeout: 5000 });
  }
}