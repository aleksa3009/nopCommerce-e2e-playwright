import BasePage from './BasePage';
import { Page } from '@playwright/test';

type Address = {
  firstName: string;
  lastName: string;
  email?: string;
  country: string;
  city: string;
  address1: string;
  zipPostal: string;
  phone: string;
};

export default class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Fill billing address in checkout form
  async fillBillingAddress(addr: Address) {
    await this.page.getByLabel('First name').fill(addr.firstName);
    await this.page.getByLabel('Last name').fill(addr.lastName);
    if (addr.email) await this.page.getByLabel('Email').fill(addr.email);
    await this.page.getByLabel('Country').selectOption({ label: addr.country });
    await this.page.getByLabel('City').fill(addr.city);
    await this.page.getByLabel('Address 1').fill(addr.address1);
    await this.page.getByLabel('Zip / postal code').fill(addr.zipPostal);
    await this.page.getByLabel('Phone number').fill(addr.phone);
    await this.page.getByRole('button', { name: /Continue/i }).click();
    await this.page.waitForLoadState('networkidle'); // wait for next step
  }

  // Select shipping method
  async selectShippingMethod(methodName: string) {
    await this.page.getByLabel(methodName).check();
    await this.page.getByRole('button', { name: /Continue/i }).click();
    await this.page.waitForLoadState('networkidle');
  }

  // Select payment method
  async selectPaymentMethod(methodName: string) {
    await this.page.getByLabel(methodName).check();
    await this.page.getByRole('button', { name: /Continue/i }).click();
    await this.page.waitForLoadState('networkidle');
  }

  // Fill credit card details (stubbed for demo)
  async fillCardDetails(card: { number: string; month: string; year: string; cvv: string }) {
    await this.page.getByLabel('Card number').fill(card.number);
    await this.page.getByLabel('Expiration month').selectOption(card.month);
    await this.page.getByLabel('Expiration year').selectOption(card.year);
    await this.page.getByLabel('Card code').fill(card.cvv);
    await this.page.getByRole('button', { name: /Continue/i }).click();
    await this.page.waitForLoadState('networkidle');
  }

  // Confirm order
  async confirmOrder() {
    await this.page.getByRole('button', { name: /Confirm/i }).click();
    await this.page.waitForLoadState('networkidle');
  }

  // Get order number after confirmation
  async getOrderNumber(): Promise<string | null> {
    const locator = this.page.locator('.order-number, .order-info, text=Order number');
    if (await locator.count() === 0) return null;
    const text = (await locator.first().textContent()) || '';
    const match = text.match(/#?(\d{4,})/);
    return match ? match[1] : text.trim();
  }
}